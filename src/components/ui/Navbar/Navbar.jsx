import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-rose-500">
          Perfume Shop
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-rose-500">
            Home
          </Link>
          <Link to="/products" className="hover:text-rose-500">
            Shop
          </Link>

          {user ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
