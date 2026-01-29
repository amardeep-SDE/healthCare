import AppointmentCard from "./widgets/AppointmentCard";
import ProfileCard from "./widgets/ProfileCard";
import { motion } from "framer-motion";

const PatientDashboard = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_70%)] min-h-screen pb-14">

      {/* soft glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-40 -right-32 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-6 sm:px-10 pt-14 pb-10"
      >
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 text-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(79,70,229,0.45)] overflow-hidden">
          
          {/* header glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 blur-3xl rounded-full" />

          <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Welcome back,
                <span className="block text-yellow-300">
                  Patient 👋
                </span>
              </h2>
              <p className="mt-3 text-indigo-100 text-sm sm:text-base max-w-xl">
                Track your appointments, manage your profile, and stay on top of
                your health — all in one place.
              </p>
            </div>

            <motion.img
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="Patient Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-2 shadow-xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 grid md:grid-cols-3 gap-8 mt-8">
        
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-6 border border-white/40"
        >
          <ProfileCard />
        </motion.div>

        {/* Appointments */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-indigo-600">📅</span>
            Upcoming Appointments
          </h3>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-md p-6 border border-white/40 hover:shadow-lg transition"
          >
            <AppointmentCard />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-md p-6 border border-white/40 hover:shadow-lg transition"
          >
            <AppointmentCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboard;
