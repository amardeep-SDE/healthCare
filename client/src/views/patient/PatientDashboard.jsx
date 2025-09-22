import AppointmentCard from "./widgets/AppointmentCard";
import ProfileCard from "./widgets/ProfileCard";
import { motion } from "framer-motion";

const PatientDashboard = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 
                   text-white rounded-b-3xl shadow-xl px-8 py-12 mb-14"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              Welcome Back,{" "}
              <span className="text-yellow-300">Patient 👋</span>
            </h2>
            <p className="mt-3 text-indigo-100 text-lg">
              Manage your health profile and upcoming appointments with ease.
            </p>
          </div>
          <motion.img
            whileHover={{ scale: 1.1, rotate: 6 }}
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Patient Avatar"
            className="w-24 h-24 mt-6 md:mt-0 rounded-full border-4 border-white shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6 sm:px-10">
        {/* Profile Info */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg 
                     p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
          <ProfileCard />
        </motion.div>

        {/* Appointments */}
        <div className="md:col-span-2 space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-indigo-600 text-3xl">📅</span>
            Upcoming Appointments
          </h3>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-md p-6 
                       hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <AppointmentCard />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-md p-6 
                       hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <AppointmentCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboard;
