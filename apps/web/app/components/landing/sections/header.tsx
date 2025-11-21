import { Link } from "@remix-run/react";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

import { useCurrentUser } from "~/api/queries/useCurrentUser";
import { PlatformLogo } from "~/components/PlatformLogo";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { UserAvatar } from "~/components/UserProfile/UserAvatar";
import { siteConfig } from "~/lib/landing-config";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: currentUser } = useCurrentUser();
  const isAuthenticated = Boolean(currentUser);

  return (
    <header className="sticky top-0 z-50 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link
          to="/"
          title="brand-logo"
          className="relative mr-4 md:mr-6 flex items-center space-x-2 flex-shrink-0"
        >
          <PlatformLogo variant="full" className="h-8 w-auto" alt="iGird Logo" />
          <span className="font-bold text-lg md:text-xl text-gray-900 hidden sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border-gray-300 focus:border-blue-500 rounded-md"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            <nav className="mr-4">
              <div className="flex items-center gap-6">
                {siteConfig.header.slice(0, 1).map((item, index) => (
                  <div key={index}>
                    {item.trigger ? (
                      <div className="relative group">
                        <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                          {item.trigger}
                        </button>
                        {item.content && (
                          <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6">
                            {item.content.main && (
                              <Link
                                to={item.content.main.href}
                                className="block mb-4 p-4 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                              >
                                <div className="mb-2">{item.content.main.icon}</div>
                                <div className="text-lg font-medium mb-1 text-gray-900">
                                  {item.content.main.title}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {item.content.main.description}
                                </p>
                              </Link>
                            )}
                            <div className="grid grid-cols-2 gap-2">
                              {item.content.items?.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={subItem.href}
                                  className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                  <div className="text-sm font-medium text-gray-900">
                                    {subItem.title}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {subItem.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href || "#"}
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-3">
                    <UserAvatar
                      userName={`${currentUser?.firstName} ${currentUser?.lastName}`}
                      profilePictureUrl={currentUser?.profilePictureUrl}
                      className="size-8"
                    />
                    <span className="hidden md:inline text-gray-700 font-medium">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to={`/dashboard/profile/${currentUser?.id}`} className="cursor-pointer">
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      Go to Dashboard
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="gap-2 flex">
                <Link to="/auth/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Join for Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="px-4 py-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="What do you want to learn?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <ul className="space-y-3">
              {siteConfig.header.map((item, index) => (
                <li key={index}>
                  {item.trigger ? (
                    <div className="font-semibold text-gray-900">{item.trigger}</div>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      className="font-semibold block text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {isAuthenticated ? (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3 px-2 py-2 border rounded-lg">
                  <UserAvatar
                    userName={`${currentUser?.firstName} ${currentUser?.lastName}`}
                    profilePictureUrl={currentUser?.profilePictureUrl}
                    className="size-10"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <Link
                  to="/auth/login"
                  className="block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link
                  to="/auth/register"
                  className="block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Join for Free</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
