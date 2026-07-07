import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavLinks({
  mobile = false,
  onClose,
}) {
  const { user } = useAuth();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Services",
      path: "/services",
    },
  ];

  // Customer Links
  if (user?.role === "customer") {
    links.push(
      {
        name: "My Bookings",
        path: "/bookings",
      },
      {
        name: "Profile",
        path: "/profile",
      }
    );
  }

  // Provider Links
  if (user?.role === "provider") {
    links.push(
      {
        name: "Dashboard",
        path: "/provider",
      },
      {
        name: "Profile",
        path: "/profile",
      }
    );
  }

  // Guest Only
  if (!user) {
    links.push({
      name: "Become Provider",
      path: "/register",
    });
  }

  return (
    <div
      className={
        mobile
          ? "flex flex-col space-y-6"
          : "hidden lg:flex items-center gap-8"
      }
    >
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={onClose}
          className={({ isActive }) =>
  `font-semibold tracking-wide transition-all duration-300 ${
    isActive
      ? "text-[#556B2F]"
      : "text-gray-700 hover:text-[#556B2F]"
  }`
}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}