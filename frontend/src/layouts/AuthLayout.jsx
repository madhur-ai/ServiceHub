import { Outlet } from "react-router-dom";
import AuthBanner from "../components/auth/AuthBanner";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      <AuthBanner />

      <div className="flex items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}