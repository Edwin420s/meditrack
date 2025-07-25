// client/src/components/dashboard/UpcomingAppointments.jsx
import { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function UpcomingAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments for the logged-in user
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments?userId=${user.id}`);
        if (!response.ok) throw new Error('Error fetching appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAppointments();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-6">
        Loading appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600 py-4">
        <AlertCircle size={18} /> <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-[#111b0e]">
        Your Upcoming Appointments
      </h3>

      {appointments.length === 0 ? (
        <div className="text-gray-500">
          You don’t have any upcoming appointments.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 border border-gray-200 rounded-lg flex items-start gap-4 bg-[#f9fbf8]"
            >
              <div className="pt-1">
                <CheckCircle className="text-green-500" size={24} />
              </div>

              <div className="flex-1">
                <p className="text-[#629550] font-medium">
                  {appointment.doctor} — {appointment.specialty}
                </p>
                <p className="text-sm text-gray-700">
                  <Calendar size={14} className="inline mr-1" />
                  {appointment.location}
                </p>
                <p className="text-sm text-gray-700 mt-1 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {formatDate(appointment.date)}
                </p>
                {appointment.reason && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Reason:</span> {appointment.reason}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-1">
                <button className="text-sm text-blue-600 hover:underline">
                  Reschedule
                </button>
                <button className="text-sm text-red-500 hover:underline">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
