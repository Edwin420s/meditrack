// client/src/components/appointment/AppointmentBooking.jsx
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function AppointmentBooking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      alert('✅ Appointment booked successfully!');
      setDate('');
      setTime('');
      setReason('');
    } catch (err) {
      console.error('❌ Booking failed:', err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-booking-container bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4 text-[#111b0e]">Book an Appointment</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 📅 Date & ⏰ Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-[#111b0e]">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[#111b0e]">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
          </div>
        </div>

        {/* 📝 Reason */}
        <div>
          <label className="block mb-1 text-sm font-medium text-[#111b0e]">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Brief reason for appointment"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            rows={4}
            required
          />
        </div>

        {/* 📩 Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#4fdf1f] text-[#111b0e] px-6 py-2 rounded font-semibold hover:bg-green-500 transition"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </form>
    </div>
  );
}
