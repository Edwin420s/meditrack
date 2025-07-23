import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import api from '../../services/api';


const DoctorQueue = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState({}); // Track per-appointment loading

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/api/appointments');
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Mark as served
  const handleServe = async (appointmentId) => {
    setMarking((prev) => ({ ...prev, [appointmentId]: true }));
    try {
      await api.put(`/appointments/${appointmentId}/serve`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: 'served' } : appt
        )
      );
    } catch (error) {
      console.error('Error serving appointment:', error);
    } finally {
      setMarking((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  // Filter logic
  const lowerSearch = searchTerm.toLowerCase();
  const filteredAppointments = appointments
    .filter((appt) =>
      appt.patient.name.toLowerCase().includes(lowerSearch) ||
      (appt.patient.mrn && appt.patient.mrn.toLowerCase().includes(lowerSearch))
    )
    .sort(
      (a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search by name or MRN"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search appointments by patient name or MRN"
        className="w-full max-w-md"
      />

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Loading appointments...
                </td>
              </tr>
            ) : filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appt) => (
                <tr key={appt._id} className="border-t">
                  <td className="px-4 py-2">{appt.patient.name}</td>
                  <td className="px-4 py-2">
                    {new Date(appt.datetime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{appt.reason}</td>
                  <td className="px-4 py-2">
                    <Badge
                      className={`${
                        appt.status === 'served'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {appt.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    {appt.status !== 'served' ? (
                      <Button
                        size="sm"
                        onClick={() => handleServe(appt._id)}
                        disabled={marking[appt._id]}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        {marking[appt._id] ? 'Marking...' : 'Mark as Served'}
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-500">Done</span>
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
};

export default DoctorQueue;
