// src/App.jsx
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import ScrollToTopButton from "./components/ScrollToTopButton";
import WhatsAppButton from "./components/WhatsAppButton";
import { CartDrawer } from "./views/medicine/CartDrawer";
import { Toaster } from "react-hot-toast";

// Code splitting with React.lazy
const Landing = lazy(() => import("./views/Landing"));
const AppointmentBooking = lazy(() => import("./views/appointment/AppointmentBooking"));
const PatientDashboard = lazy(() => import("./views/patient/PatientDashboard"));
const MyAppointments = lazy(() => import("./views/patient/MyAppointments"));
const DoctorDashboard = lazy(() => import("./views/doctor/DoctorDashboard"));
const MedicineStore = lazy(() => import("./views/medicine/MedicineStore"));
const OrderTracking = lazy(() => import("./views/medicine/OrderTracking"));
const Login = lazy(() => import("./views/auth/Login"));
const Register = lazy(() => import("./views/auth/Register"));

// Fast medical loader fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600" />
    <span className="text-xs font-semibold text-gray-500">Loading Clinic Portal...</span>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Landing />
          </Suspense>
        ),
      },
      {
        path: "/appointment",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AppointmentBooking />
          </Suspense>
        ),
      },
      {
        path: "/patient/dashboard",
        element: (
            <Suspense fallback={<PageLoader />}>
              <PatientDashboard />
          </Suspense >
        ),
      },
{
  path: "/my-appointments",
    element: (
        <Suspense fallback={<PageLoader />}>
          <MyAppointments />
          </Suspense >
        ),
},
{
      path: "/doctor/dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <DoctorDashboard />
          </Suspense>
        ),
      },
{
  path: "/medicines",
    element: (
      <Suspense fallback={<PageLoader />}>
        <MedicineStore />
      </Suspense>
    ),
      },
{
  path: "/orders",
    element: (
      <Suspense fallback={<PageLoader />}>
        <OrderTracking />
      </Suspense>
    ),
      },
{
  path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    ),
      },
{
  path: "/register",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Register />
      </Suspense>
    ),
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "#1e1b4b",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "600",
          },
        }}
      />
      <RouterProvider router={appRouter} />
      <CartDrawer />
      <ScrollToTopButton />
      <WhatsAppButton />
    </>
  );
};

export default App;
