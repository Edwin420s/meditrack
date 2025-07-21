import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AppointmentQueue() {
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
      setAppointments(appointments.map(appt => 
        appt._id === id ? { ...appt, status: 'served' } : appt
      ));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const filteredAppointments = appointments.filter(appt =>
    appt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search by patient name or reason"
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.patient.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(appointment.datetime).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.reason}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {appointment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => handleMarkAsServed(appointment._id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Mark as Served
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}