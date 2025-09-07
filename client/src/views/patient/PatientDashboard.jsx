import AppointmentCard from "./widgets/AppointmentCard";
import ProfileCard from "./widgets/ProfileCard";

const PatientDashboard = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-b-3xl shadow-lg px-8 py-10 mb-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold">
              Welcome Back, <span className="text-yellow-300">Patient 👋</span>
            </h2>
            <p className="mt-2 text-indigo-100">
              Manage your health profile and upcoming appointments easily.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Patient Avatar"
            className="w-20 h-20 mt-6 md:mt-0 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 sm:px-10">
        {/* Profile Info */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <ProfileCard />
        </div>

        {/* Appointments */}
        <div className="md:col-span-2 space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <span className="text-indigo-600 text-3xl">📅</span> Upcoming
            Appointments
          </h3>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <AppointmentCard />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <AppointmentCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboard;
