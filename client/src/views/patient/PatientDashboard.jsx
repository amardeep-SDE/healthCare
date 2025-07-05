import AppointmentCard from "./widgets/AppointmentCard";
import ProfileCard from "./widgets/ProfileCard";


const PatientDashboard = () => {
  return (
    <section className="bg-[#F9FAFB] min-h-screen py-10 px-6 sm:px-10 md:px-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Welcome, <span className="text-indigo-600">Patient</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <ProfileCard />

        {/* Appointments */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">Upcoming Appointments</h3>
          <AppointmentCard />
          <AppointmentCard />
        </div>
      </div>
    </section>
  );
};

export default PatientDashboard;
