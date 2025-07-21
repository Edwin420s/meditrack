import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import api from '../services/api';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/api/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/appointments/${id}`, { status });
      setAppointments(prev =>
        prev.map(app => (app._id === id ? res.data : app))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAddNotes = async (id) => {
    const note = notes[id]?.trim();
    if (!note) return;

    try {
      const res = await api.put(`/api/appointments/${id}`, { notes: note });
      setAppointments(prev =>
        prev.map(app => (app._id === id ? res.data : app))
      );
      setNotes(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error('Error adding notes:', err);
    }
  };

  const handleNoteChange = (id, value) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-lg font-medium">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Appointment Queue</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments scheduled</p>
        ) : (
          <div className="space-y-6">
            {appointments.map(appointment => (
              <div key={appointment._id} className="border-b pb-4">
                <AppointmentCard
                  appointment={appointment}
                  onUpdate={handleUpdateStatus}
                  isDoctor={true}
                />

                <div className="mt-3 flex">
                  <input
                    type="text"
                    value={notes[appointment._id] || ''}
                    onChange={(e) =>
                      handleNoteChange(appointment._id, e.target.value)
                    }
                    placeholder="Add visit notes"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring"
                  />
                  <button
                    onClick={() => handleAddNotes(appointment._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
                  >
                    Add Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
