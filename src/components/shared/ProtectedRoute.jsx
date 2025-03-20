import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center pt-20 pl-10 justify-center h-64">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  return user ? children : <Navigate to="/login" replace />;
};
