import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBus } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import {
  CreatePasswordReminderEmail,
  EmailVerificationEmail,
  PasswordRecoveryEmail,
} from "@repo/email-templates";
import * as bcrypt from "bcryptjs";
import { and, eq, isNull, lt, lte, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { authenticator } from "otplib";

import { SUPPORTED_LANGUAGES, type SupportedLanguages } from "src/ai/utils/ai.type";
import { CORS_ORIGIN } from "src/auth/consts";
import { DatabasePg, type UUIDType } from "src/common";
import { EmailService } from "src/common/emails/emails.service";
import hashPassword from "src/common/helpers/hashPassword";
import { UserPasswordCreatedEvent } from "src/events/user/user-password-created.event";
import { UserRegisteredEvent } from "src/events/user/user-registered.event";
import { SettingsService } from "src/settings/settings.service";
import { USER_ROLES, type UserRole } from "src/user/schemas/userRoles";

import {
  createTokens,
  credentials,
  emailVerificationTokens,
  resetTokens,
  userOnboarding,
  users,
} from "../storage/schema";
import { UserService } from "../user/user.service";

import { CreatePasswordService } from "./create-password.service";
import { ResetPasswordService } from "./reset-password.service";
import { TokenService } from "./token.service";

import type { CreatePasswordBody } from "./schemas/create-password.schema";
import type { Response } from "express";
import type { CommonUser } from "src/common/schemas/common-user.schema";
import type { UserResponse } from "src/user/schemas/user.schema";
import type { ProviderLoginUserType } from "src/utils/types/provider-login-user.type";

@Injectable()
export class AuthService {
  constructor(
    @Inject("DB") private readonly db: DatabasePg,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    private emailService: EmailService,
    private createPasswordService: CreatePasswordService,
    private resetPasswordService: ResetPasswordService,
    private settingsService: SettingsService,
    private eventBus: EventBus,
    private tokenService: TokenService,
  ) {}

  public async register({
    email,
    firstName,
    lastName,
    password,
    language,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    language: string;
  }) {
    const [existingUser] = await this.db.select().from(users).where(eq(users.email, email));
    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    return this.db.transaction(async (trx) => {
      const [newUser] = await trx
        .insert(users)
        .values({
          email,
          firstName,
          lastName,
          emailVerified: false,
        })
        .returning();

      await trx.insert(credentials).values({
        userId: newUser.id,
        password: hashedPassword,
      });

      await trx.insert(userOnboarding).values({ userId: newUser.id });
      const languageGuard = Object.values(SUPPORTED_LANGUAGES).includes(
        language as SupportedLanguages,
      )
        ? language
        : "en";

      await this.settingsService.createSettingsIfNotExists(
        newUser.id,
        newUser.role as UserRole,
        { language: languageGuard },
        trx,
      );

      // Generate email verification token
      const verificationToken = nanoid(64);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24); // Token expires in 24 hours

      await trx.insert(emailVerificationTokens).values({
        userId: newUser.id,
        token: verificationToken,
        expiryDate,
      });

      // Send verification email
      const verificationLink = `${CORS_ORIGIN}/auth/verify-email?token=${verificationToken}`;
      const emailTemplate = new EmailVerificationEmail({
        name: firstName,
        verificationLink,
      });

      try {
        await this.emailService.sendEmail({
          to: email,
          subject: "Verify your email address",
          text: emailTemplate.text,
          html: emailTemplate.html,
          from: process.env.SES_EMAIL || "",
        });
      } catch (error) {
        console.error("Failed to send verification email:", error);
        // Don't fail registration if email sending fails
      }

      const { avatarReference, ...userWithoutAvatar } = newUser;
      const usersProfilePictureUrl =
        await this.userService.getUsersProfilePictureUrl(avatarReference);

      this.eventBus.publish(new UserRegisteredEvent(newUser));

      return { ...userWithoutAvatar, profilePictureUrl: usersProfilePictureUrl };
    });
  }

  public async login(data: { email: string; password: string }, MFAEnforcedRoles: UserRole[]) {
    const user = await this.validateUser(data.email, data.password);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (user.archived) {
      throw new UnauthorizedException("Your account has been archived");
    }

    // Check if email is verified
    if (!user.emailVerified) {
      throw new UnauthorizedException("Please verify your email before logging in");
    }

    const { accessToken, refreshToken } = await this.getTokens(user);

    const { avatarReference, ...userWithoutAvatar } = user;
    const usersProfilePictureUrl =
      await this.userService.getUsersProfilePictureUrl(avatarReference);

    const userSettings = await this.settingsService.getUserSettings(user.id);

    const onboardingStatus = await this.userService.getAllOnboardingStatus(user.id);

    if (
      MFAEnforcedRoles.includes(userWithoutAvatar.role as UserRole) ||
      userSettings.isMFAEnabled
    ) {
      return {
        ...userWithoutAvatar,
        profilePictureUrl: usersProfilePictureUrl,
        accessToken,
        refreshToken,
        shouldVerifyMFA: true,
        onboardingStatus,
      };
    }

    return {
      ...userWithoutAvatar,
      profilePictureUrl: usersProfilePictureUrl,
      accessToken,
      refreshToken,
      shouldVerifyMFA: false,
      onboardingStatus,
    };
  }

  public async currentUser(id: UUIDType) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const onboardingStatus = await this.userService.getAllOnboardingStatus(user.id);

    const { MFAEnforcedRoles } = await this.settingsService.getGlobalSettings();
    const userSettings = await this.settingsService.getUserSettings(user.id);

    if (MFAEnforcedRoles.includes(user.role as UserRole) || userSettings.isMFAEnabled) {
      return { ...user, shouldVerifyMFA: true, onboardingStatus };
    }

    return { ...user, shouldVerifyMFA: false, onboardingStatus };
  }

  public async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>("jwt.refreshSecret"),
        ignoreExpiration: false,
      });

      const user = await this.userService.getUserById(payload.userId);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const tokens = await this.getTokens(user);
      return tokens;
    } catch (error) {
      throw new ForbiddenException("Invalid refresh token");
    }
  }

  public async validateUser(email: string, password: string) {
    const [userWithCredentials] = await this.db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        password: credentials.password,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        role: users.role,
        archived: users.archived,
        avatarReference: users.avatarReference,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .leftJoin(credentials, eq(users.id, credentials.userId))
      .where(eq(users.email, email));

    if (!userWithCredentials || !userWithCredentials.password) return null;

    const isPasswordValid = await bcrypt.compare(password, userWithCredentials.password);

    if (!isPasswordValid) return null;

    const { password: _, ...user } = userWithCredentials;

    return user;
  }

  private async getTokens(user: CommonUser | UserResponse) {
    const { id: userId, email, role } = user;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email, role },
        {
          expiresIn: this.configService.get<string>("jwt.expirationTime"),
          secret: this.configService.get<string>("jwt.secret"),
        },
      ),
      this.jwtService.signAsync(
        { userId, email, role },
        {
          expiresIn: "7d",
          secret: this.configService.get<string>("jwt.refreshSecret"),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  public async forgotPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new BadRequestException("Email not found");

    const resetToken = nanoid(64);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await this.db.insert(resetTokens).values({
      userId: user.id,
      resetToken,
      expiryDate,
    });

    const emailTemplate = new PasswordRecoveryEmail({
      email,
      name: email,
      resetLink: `${CORS_ORIGIN}/auth/create-new-password?resetToken=${resetToken}&email=${email}`,
    });

    await this.emailService.sendEmail({
      to: email,
      subject: "Password recovery",
      text: emailTemplate.text,
      html: emailTemplate.html,
      from: process.env.SES_EMAIL || "",
    });
  }

  public async createPassword(data: CreatePasswordBody) {
    const { createToken: token, password, language } = data;
    const createToken = await this.createPasswordService.getOneByToken(token);

    const [existingUser] = await this.db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        role: users.role,
        archived: users.archived,
        avatarReference: users.avatarReference,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(users.id, createToken.userId));

    if (!existingUser) throw new NotFoundException("User not found");

    const hashedPassword = await hashPassword(password);

    await this.db
      .insert(credentials)
      .values({ userId: createToken.userId, password: hashedPassword });
    await this.createPasswordService.deleteToken(token);

    const languageGuard = Object.values(SUPPORTED_LANGUAGES).includes(
      language as SupportedLanguages,
    )
      ? language
      : "en";

    await this.settingsService.createSettingsIfNotExists(
      createToken.userId,
      existingUser.role as UserRole,
      { language: languageGuard },
    );

    this.eventBus.publish(new UserPasswordCreatedEvent(existingUser));

    return existingUser;
  }

  public async resetPassword(token: string, newPassword: string) {
    const resetToken = await this.resetPasswordService.getOneByToken(token);

    await this.userService.resetPassword(resetToken.userId, newPassword);
    await this.resetPasswordService.deleteToken(token);
  }

  private async fetchExpiredTokens() {
    return this.db
      .select({
        userId: createTokens.userId,
        email: users.email,
        oldCreateToken: createTokens.createToken,
        tokenExpiryDate: createTokens.expiryDate,
        reminderCount: createTokens.reminderCount,
      })
      .from(createTokens)
      .leftJoin(credentials, eq(createTokens.userId, credentials.userId))
      .innerJoin(users, eq(createTokens.userId, users.id))
      .where(
        and(
          isNull(credentials.userId),
          lte(sql`DATE(${createTokens.expiryDate})`, sql`CURRENT_DATE`),
          lt(createTokens.reminderCount, 3),
        ),
      );
  }

  private generateNewTokenAndEmail(email: string) {
    const createToken = nanoid(64);
    const emailTemplate = new CreatePasswordReminderEmail({
      createPasswordLink: `${CORS_ORIGIN}/auth/create-new-password?createToken=${createToken}&email=${email}`,
    });

    return { createToken, emailTemplate };
  }

  private async sendEmailAndUpdateDatabase(
    userId: UUIDType,
    email: string,
    oldCreateToken: string,
    createToken: string,
    emailTemplate: { text: string; html: string },
    expiryDate: Date,
    reminderCount: number,
  ) {
    await this.db.transaction(async (transaction) => {
      try {
        await transaction.insert(createTokens).values({
          userId,
          createToken,
          expiryDate,
          reminderCount,
        });

        await this.emailService.sendEmail({
          to: email,
          subject: "Account creation reminder",
          text: emailTemplate.text,
          html: emailTemplate.html,
          from: process.env.SES_EMAIL || "",
        });

        await transaction.delete(createTokens).where(eq(createTokens.createToken, oldCreateToken));
      } catch (error) {
        transaction.rollback();

        throw error;
      }
    });
  }

  public async checkTokenExpiryAndSendEmail() {
    const expiryTokens = await this.fetchExpiredTokens();

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    expiryTokens.map(async ({ userId, email, oldCreateToken, reminderCount }) => {
      const { createToken, emailTemplate } = this.generateNewTokenAndEmail(email);

      await this.sendEmailAndUpdateDatabase(
        userId,
        email,
        oldCreateToken,
        createToken,
        emailTemplate,
        expiryDate,
        reminderCount + 1,
      );
    });
  }

  public async handleProviderLoginCallback(userCallback: ProviderLoginUserType) {
    if (!userCallback) {
      throw new UnauthorizedException("User data is missing");
    }

    const { inviteOnlyRegistration } = await this.settingsService.getGlobalSettings();
    let [user] = await this.db.select().from(users).where(eq(users.email, userCallback.email));

    if (user?.archived) {
      throw new UnauthorizedException("Your account has been archived");
    }

    if (!user && inviteOnlyRegistration) {
      throw new UnauthorizedException("Registration is invite-only.");
    }

    if (!user && !inviteOnlyRegistration) {
      user = await this.userService.createUser({
        email: userCallback.email,
        firstName: userCallback.firstName,
        lastName: userCallback.lastName,
        role: USER_ROLES.STUDENT,
      });

      await this.settingsService.createSettingsIfNotExists(
        user.id,
        user.role as UserRole,
        undefined,
      );
    }

    const tokens = await this.getTokens(user);

    const userSettings = await this.settingsService.getUserSettings(user.id);
    const { MFAEnforcedRoles } = await this.settingsService.getGlobalSettings();

    if (MFAEnforcedRoles.includes(user.role as UserRole) || userSettings.isMFAEnabled) {
      return {
        ...tokens,
        shouldVerifyMFA: true,
      };
    }

    return {
      ...tokens,
      shouldVerifyMFA: false,
    };
  }

  async generateMFASecret(userId: string) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const secret = authenticator.generateSecret();

    const newSettings = await this.settingsService.updateUserSettings(userId, {
      MFASecret: secret,
    });

    if (!newSettings.MFASecret) {
      throw new BadRequestException("Failed to generate secret");
    }

    return {
      secret,
      otpauth: `otpauth://totp/iGird:${user.email}?secret=${secret}&issuer=iGird`,
    };
  }

  async verifyMFACode(userId: string, token: string, response: Response) {
    if (!userId || !token) {
      throw new BadRequestException("User ID and token are required");
    }

    const settings = await this.settingsService.getUserSettings(userId);

    if (!settings.MFASecret) return false;

    const isValid = authenticator.check(token, settings.MFASecret);

    if (!isValid) {
      throw new BadRequestException("Invalid MFA token");
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException("Failed to retrieve user");
    }

    const { refreshToken, accessToken } = await this.getTokens(user);

    this.tokenService.clearTokenCookies(response);
    this.tokenService.setTokenCookies(response, accessToken, refreshToken, true);

    await this.settingsService.updateUserSettings(userId, {
      isMFAEnabled: true,
    });

    return isValid;
  }

  public async verifyEmail(token: string) {
    const [verificationToken] = await this.db
      .select()
      .from(emailVerificationTokens)
      .where(eq(emailVerificationTokens.token, token));

    if (!verificationToken) {
      throw new BadRequestException("Invalid or expired verification token");
    }

    if (new Date() > verificationToken.expiryDate) {
      // Delete expired token
      await this.db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));
      throw new BadRequestException("Verification token has expired. Please request a new one.");
    }

    // Update user's emailVerified status
    await this.db
      .update(users)
      .set({ emailVerified: true })
      .where(eq(users.id, verificationToken.userId));

    // Delete the used token
    await this.db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));

    return { message: "Email verified successfully" };
  }

  public async resendVerificationEmail(email: string) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));

    if (!user) {
      // Don't reveal if user exists or not for security
      return { message: "If the email exists, a verification link has been sent" };
    }

    if (user.emailVerified) {
      throw new BadRequestException("Email is already verified");
    }

    // Delete existing verification tokens for this user
    await this.db
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.userId, user.id));

    // Generate new verification token
    const verificationToken = nanoid(64);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    await this.db.insert(emailVerificationTokens).values({
      userId: user.id,
      token: verificationToken,
      expiryDate,
    });

    // Send verification email
    const verificationLink = `${CORS_ORIGIN}/auth/verify-email?token=${verificationToken}`;
    const emailTemplate = new EmailVerificationEmail({
      name: user.firstName,
      verificationLink,
    });

    await this.emailService.sendEmail({
      to: email,
      subject: "Verify your email address",
      text: emailTemplate.text,
      html: emailTemplate.html,
      from: process.env.SES_EMAIL || "",
    });

    return { message: "Verification email sent" };
  }
}
