import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Services
import Services from "../pages/services/Services";
import ServiceDetails from "../pages/services/ServiceDetails";
import BookService from "../pages/services/BookService";

// Dashboard
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import CreateService from "../pages/provider/CreateService";
// User
import Profile from "../pages/user/Profile";
import MyBookings from "../pages/user/MyBookings";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import EditService from "../pages/provider/EditService";
import ProviderBookings from "../pages/provider/ProviderBookings";
import AddReview from "../pages/review/AddReview";
import Checkout from "../pages/payment/Checkout";
import PaymentSuccess from "../pages/payment/PaymentSuccess";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/service/:id"
            element={<ServiceDetails />}
          />
        </Route>

        {/* ================= AUTH ================= */}

        <Route element={<AuthLayout />}>
         <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>
         <Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>

        </Route>

        {/* ================= DASHBOARD ================= */}

        <Route element={<DashboardLayout />}>

        <Route
  path="/customer"
  element={
    <ProtectedRoute
      allowedRoles={["customer"]}
    >
      <CustomerDashboard />
    </ProtectedRoute>
  }
/>

          <Route
  path="/provider"
  element={
    <ProtectedRoute
      allowedRoles={["provider"]}
    >
      <ProviderDashboard />
    </ProtectedRoute>
  }
/>

<Route
    path="/provider/create-service"
    element={
        <ProtectedRoute
            allowedRoles={["provider"]}
        >
            <CreateService/>
        </ProtectedRoute>
    }
/>
<Route
  path="/provider/edit/:id"
  element={
    <ProtectedRoute
      allowedRoles={["provider"]}
    >
      <EditService />
    </ProtectedRoute>
  }
/>

         <Route
  path="/profile"
  element={
    <ProtectedRoute
      allowedRoles={[
        "customer",
        "provider",
        "admin",
      ]}
    >
      <Profile />
    </ProtectedRoute>
  }
/>

          <Route
  path="/book/:id"
  element={
    <ProtectedRoute allowedRoles={["customer"]}>
      <BookService />
    </ProtectedRoute>
  }
/>

        <Route
  path="/bookings"
  element={
    <ProtectedRoute
      allowedRoles={["customer"]}
    >
      <MyBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/provider/bookings"
  element={
    <ProtectedRoute
      allowedRoles={["provider"]}
    >
      <ProviderBookings />
    </ProtectedRoute>
  }
/>
<Route
  path="/review/:bookingId"
  element={
    <ProtectedRoute
      allowedRoles={["customer"]}
    >
      <AddReview />
    </ProtectedRoute>
  }
/>

<Route
  path="/checkout/:bookingId"
  element={
    <ProtectedRoute allowedRoles={["customer"]}>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/payment-success"
  element={
    <ProtectedRoute allowedRoles={["customer"]}>
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>

        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

