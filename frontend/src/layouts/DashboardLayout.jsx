import { Outlet } from "react-router-dom";
 import Navbar from "../components/layout/Navbar";
 import Footer from "../components/layout/Footer";
export default function DashboardLayout() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-[#F8FAF6]">
      <Outlet />
    </main>
    <Footer/>
    </>
  );
}
