import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#F8FAF6]/90 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-[#F8FAF6]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Logo />

            <NavLinks />

            <div className="hidden lg:flex items-center gap-4">

              {!user ? (
                <>
                  <Link to="/login">
                    <Button variant="secondary">
                      Login
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button>
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#556B2F] text-white flex items-center justify-center font-bold uppercase">
                      {user.name?.charAt(0)}
                     
                    </div>

                    <div>
                      <p className="font-semibold">
                        {user.name}
                      </p>

                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {user.role === "customer" ? (
                    <Link to="/customer">
                      <Button variant="secondary">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/provider">
                      <Button variant="secondary">
                        Dashboard
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}

            </div>

            <button
              onClick={() => setIsOpen(true)}
             className="lg:hidden p-2 rounded-xl hover:bg-[#EEF4E7] transition"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}