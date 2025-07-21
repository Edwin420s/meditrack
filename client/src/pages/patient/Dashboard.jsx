import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import AppointmentCard from '../../components/appointment/AppointmentCard'; 
import api from '../../services/api';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    datetime: '',
    reason: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/api/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch appointments:', err);
        setError('Could not load appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle appointment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/api/appointments', formData);
      setAppointments([res.data, ...appointments]);
      setFormData({ datetime: '', reason: '' });
    } catch (err) {
      console.error('❌ Failed to book appointment:', err);
      setError('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="dashboard patient-dashboard flex min-h-screen bg-gray-50">
      <Sidebar active="dashboard" />

      <main className="main-content flex-1 p-6">
        <Header title={`Welcome, ${user?.name || 'Patient'}`} />

        {/* Appointment Booking Section */}
        <section className="appointment-booking mb-10">
          <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>

          <div className="p-6 bg-white rounded shadow">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Brief reason for appointment"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition duration-200"
                >
                  Book Appointment
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-red-500 text-sm">{error}</div>
            )}
          </div>
        </section>

        {/* Upcoming Appointments Section */}
        <section className="upcoming-appointments">
          <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>

          {loading ? (
            <div className="text-center text-gray-500 py-6">Loading appointments...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : appointments.length === 0 ? (
            <p className="text-gray-600">You have no upcoming appointments.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  isDoctor={false}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
