import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import NavLinks from "./NavLinks";
import Button from "../ui/Button";

import { useAuth } from "../../context/AuthContext";

export default function MobileMenu({
  isOpen,
  setIsOpen,
}) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();

    setIsOpen(false);

    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">
<div className="bg-[#FCFCFA] w-80 h-full p-8 shadow-2xl">
          <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
          >
<X size={30} className="text-[#556B2F]" />
          </button>
        </div>

        {user && (
          <div className="mt-8 flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-[#556B2F] text-white flex items-center justify-center font-bold uppercase">
              {user.name?.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500 capitalize">
                {user.role}
              </p>
            </div>

          </div>
        )}

        <div className="mt-10">

          <NavLinks
            mobile
            onClose={() => setIsOpen(false)}
          />

          <div className="mt-12 space-y-5">

            {!user ? (
              <>
                <Link to="/login">
                  <Button
                    className="w-full"
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                variant="danger"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}