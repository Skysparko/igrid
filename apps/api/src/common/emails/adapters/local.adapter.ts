import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

import { EmailAdapter } from "./email.adapter";

import type { Email } from "../email.interface";

@Injectable()
export class LocalAdapter extends EmailAdapter {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(LocalAdapter.name);

  constructor(private configService: ConfigService) {
    super();

    let host = this.configService.get<string>("email.SMTP_HOST");
    let port = this.configService.get<number>("email.SMTP_PORT");

    if (!host) {
      host = "localhost";
    }
    if (!port) {
      port = 1025;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      ignoreTLS: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: undefined,
    });

    this.logger.log(`MailHog configured: ${host}:${port}`);
  }

  async sendMail(email: Email): Promise<void> {
    this.logger.log(`📧 Sending email to: ${email.to} | Subject: "${email.subject}"`);
    try {
      const result = await this.transporter.sendMail(email);
      this.logger.log(
        `✅ Email sent successfully to: ${email.to} | MessageId: ${result.messageId}`,
      );
    } catch (error) {
      this.logger.error(`❌ Failed to send email to: ${email.to} | Error: ${error.message}`);
      throw error;
    }
  }
}
