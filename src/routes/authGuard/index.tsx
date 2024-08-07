import { User } from "@/types/dtos/auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AuthGuard({ children, roles }: any) {
  const me: User | null = useSelector((state: any) => state.auth.me) as User | null;

  const isAuthorizedRole = me?._id && roles.includes(me?.role);

  return <>{isAuthorizedRole ? { ...children } : <Navigate to="/login" />}</>;
}
