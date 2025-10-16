import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./views/Landing";

import PatientDashboard from "./views/patient/PatientDashboard";
import Appointment from "./views/Appointment";
import MyAppointments from "./views/patient/MyAppointments";
import ScrollToTopButton from "./components/ScrollToTopButton";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from 'react-hot-toast';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },

      {
        path: "/patient/dashboard",
        element: <PatientDashboard />,
      },

      {
        path: "/appointment",
        element: <Appointment />,
      },
      {
        path: "/my-appointments",
        element: <MyAppointments />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={appRouter} />
      <ScrollToTopButton />
      <WhatsAppButton />
    </>
  );
};

export default App;
