import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./views/Landing";

import PatientDashboard from "./views/patient/PatientDashboard";
import Appointment from "./views/Appointment";
import MyAppointments from "./views/patient/MyAppointments";

import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

import ProtectedRoute from "./routes/ProtectedRoute";

import ScrollToTopButton from "./components/ScrollToTopButton";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },

      // 🔐 Auth
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      // 🔒 Protected Patient Routes
      {
        path: "/patient/dashboard",
        element: (
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-appointments",
        element: (
          <ProtectedRoute>
            <MyAppointments />
          </ProtectedRoute>
        ),
      },

      // 🌐 Public
      {
        path: "/appointment",
        element: <Appointment />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={appRouter} />
      <ScrollToTopButton />
      <WhatsAppButton />
    </>
  );
};

export default App;
