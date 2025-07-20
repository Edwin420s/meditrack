import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import api from '../services/api';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({}); // Use object to manage multiple notes

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/api/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/appointments/${id}`, { status });
      setAppointments(appointments.map(app =>
        app._id === id ? res.data : app
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNotes = async (id) => {
    const note = notes[id]?.trim();
    if (!note) return;

    try {
      const res = await api.put(`/api/appointments/${id}`, { notes: note });
      setAppointments(appointments.map(app =>
        app._id === id ? res.data : app
      ));
      setNotes(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleNoteChange = (id, value) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return <div className="text-center py-10">Loading appointments...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Appointment Queue</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments scheduled</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment._id}>
                <AppointmentCard
                  appointment={appointment}
                  onUpdate={handleUpdateStatus}
                  isDoctor={true}
                />

                <div className="mt-2 flex">
                  <input
                    type="text"
                    value={notes[appointment._id] || ''}
                    onChange={(e) => handleNoteChange(appointment._id, e.target.value)}
                    placeholder="Add visit notes"
                    className="flex-grow px-3 py-1 border rounded-l"
                  />
                  <button
                    onClick={() => handleAddNotes(appointment._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600"
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
