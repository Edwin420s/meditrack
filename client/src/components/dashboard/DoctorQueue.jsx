import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function DoctorQueue() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/api/appointments');
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleMarkAsServed = async (id) => {
    try {
      await api.put(`/api/appointments/${id}`, { status: 'served' });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: 'served' } : appt
        )
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const filteredAppointments = appointments
    .filter((appt) =>
      appt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appt.patient.mrn &&
        appt.patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  return (
    <div className="doctor-queue p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Appointment Queue</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by patient name or MRN"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Date / Time</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{appointment.patient.name}</td>
                  <td className="px-4 py-2">
                    {new Date(appointment.datetime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{appointment.reason}</td>
                  <td className="px-4 py-2">
                    <Badge status={appointment.status}>
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    {appointment.status === 'pending' && (
                      <Button
                        size="small"
                        onClick={() => handleMarkAsServed(appointment._id)}
                      >
                        Mark as Served
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
