import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu and Logo Container */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="mt-6 space-y-4">
                  <Link
                    to="/"
                    className="block px-4 py-2 font-semibold text-gray-700 hover:text-primary"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="block px-4 py-2 font-semibold text-gray-700 hover:text-primary"
                  >
                    Shop
                  </Link>
                  {/* Mobile Authentication Links */}
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 font-semibold text-gray-700 hover:text-primary"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-left font-semibold text-gray-700 hover:text-primary"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="block px-4 py-2 font-semibold text-gray-700 hover:text-primary"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Moved inside the flex container */}
          <Link to="/" className="text-xl font-bold text-primary">
            Lumina
          </Link>
        </div>

        {/* Desktop Right Side Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-primary"
          >
            Shop
          </Link>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Login
            </Button>
          )}
        </div>

        {/* Mobile Cart Icon */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
