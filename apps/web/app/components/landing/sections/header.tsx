import { Link } from "@remix-run/react";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import { useLogoutUser } from "~/api/mutations";
import { useCurrentUser } from "~/api/queries/useCurrentUser";
import { PlatformLogo } from "~/components/PlatformLogo";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { UserAvatar } from "~/components/UserProfile/UserAvatar";
import { USER_ROLE } from "~/config/userRoles";
import { siteConfig } from "~/lib/landing-config";
import { cn } from "~/lib/utils";

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm text-gray-700 outline-none transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50";

function formatRole(role?: string) {
  if (!role) return "Member";
  if (role === USER_ROLE.contentCreator) return "Content Creator";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: currentUser } = useCurrentUser();
  const { mutate: logout } = useLogoutUser();
  const isAuthenticated = Boolean(currentUser);
  const fullName = currentUser
    ? `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`.trim()
    : "";

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-primary-700/20 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
          <GraduationCap className="hidden h-4 w-4 shrink-0 sm:block" />
          <span>
            AI Mentor, interactive courses, and faith-based learning —{" "}
            <Link
              to="/auth/register"
              className="underline underline-offset-2 hover:text-primary-100"
            >
              start free today
            </Link>
          </span>
        </div>
      </div>

      <div className="border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" title="iGird home" className="relative flex shrink-0 items-center">
            <PlatformLogo variant="full" className="h-8 w-auto" alt="iGird Logo" />
          </Link>

          <div className="hidden max-w-md flex-1 lg:block xl:max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full border-gray-200 bg-gray-50/80 pl-10 text-sm focus:border-primary-300 focus:bg-white"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-1 xl:flex">
            {siteConfig.header.map((item, index) => (
              <div key={index} className="px-2">
                {item.trigger ? (
                  <div className="group relative">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
                    >
                      {item.trigger}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                    {item.content && (
                      <div className="invisible absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,28rem)] rounded-xl border border-gray-200/80 bg-white p-2 opacity-0 shadow-xl ring-1 ring-black/5 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        {item.content.main && (
                          <Link
                            to={item.content.main.href}
                            className="mb-2 flex gap-3 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 transition-colors hover:from-primary-100"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                              {item.content.main.icon}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {item.content.main.title}
                              </div>
                              <p className="mt-0.5 text-xs text-gray-600">
                                {item.content.main.description}
                              </p>
                            </div>
                          </Link>
                        )}
                        <div
                          className={cn(
                            "grid gap-0.5",
                            item.content.main ? "grid-cols-2" : "grid-cols-1",
                          )}
                        >
                          {item.content.items?.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              className="rounded-lg p-3 transition-colors hover:bg-gray-50"
                            >
                              <div className="text-sm font-medium text-gray-900">
                                {subItem.title}
                              </div>
                              <p className="mt-0.5 text-xs text-gray-500">{subItem.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href || "#"}
                    className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto gap-2 rounded-full border border-gray-200/80 bg-white px-2 py-1.5 pl-1.5 pr-3 shadow-sm hover:bg-gray-50"
                  >
                    <UserAvatar
                      userName={fullName}
                      profilePictureUrl={currentUser?.profilePictureUrl}
                      className="size-8"
                    />
                    <span className="hidden max-w-[7rem] truncate text-sm font-medium text-gray-800 md:inline">
                      {currentUser?.firstName}
                    </span>
                    <ChevronDown className="hidden h-4 w-4 text-gray-400 md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  <DropdownMenuLabel className="px-2 py-2 font-normal">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        userName={fullName}
                        profilePictureUrl={currentUser?.profilePictureUrl}
                        className="size-10"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{fullName}</p>
                        <p className="truncate text-xs text-gray-500">{currentUser?.email}</p>
                        <span className="mt-1.5 inline-flex rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
                          {formatRole(currentUser?.role)}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                    <Link to="/courses" className={menuItemClass}>
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      Browse Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                    <Link to={`/dashboard/profile/${currentUser?.id}`} className={menuItemClass}>
                      <User className="h-4 w-4 text-gray-400" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                    <Link to="/dashboard/settings" className={menuItemClass}>
                      <Settings className="h-4 w-4 text-gray-400" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                    <Link
                      to="/dashboard"
                      className={cn(menuItemClass, "font-medium text-primary-700")}
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary-600" />
                      Go to Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="mt-1 p-0 focus:bg-transparent"
                    onSelect={() => logout()}
                  >
                    <span
                      className={cn(
                        menuItemClass,
                        "text-red-600 hover:bg-red-50 hover:text-red-700",
                      )}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="bg-primary-600 shadow-sm hover:bg-primary-700">
                    Join for Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full pl-10"
              />
            </div>

            {siteConfig.header.map((item, index) => (
              <div key={index} className="border-b border-gray-100 py-3 last:border-0">
                {item.trigger ? (
                  <>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {item.trigger}
                    </p>
                    <div className="space-y-1">
                      {item.content?.main && (
                        <Link
                          to={item.content.main.href}
                          className="block rounded-lg bg-primary-50 px-3 py-2 text-sm font-medium text-primary-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.content.main.title}
                        </Link>
                      )}
                      {item.content?.items?.map((sub) => (
                        <Link
                          key={sub.title}
                          to={sub.href}
                          className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href || "#"}
                    className="block text-sm font-semibold text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {isAuthenticated ? (
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <UserAvatar
                    userName={fullName}
                    profilePictureUrl={currentUser?.profilePictureUrl}
                    className="size-11"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">{fullName}</p>
                    <p className="truncate text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 pt-4">
                <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">
                    Join for Free
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
