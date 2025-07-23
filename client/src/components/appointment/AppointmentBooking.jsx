// client/src/components/appointment/AppointmentBooking.jsx
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function AppointmentBooking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      alert('Appointment booked successfully!');
      setDate('');
      setTime('');
      setReason('');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="appointment-booking-container">
      <h3 className="section-title">Book an Appointment</h3>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label className="form-label">Date & Time</label>
          <div className="datetime-inputs">
            <div className="input-with-icon">
              <Calendar className="input-icon" size={18} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-input"
                required
              />
            </div>
            <div className="input-with-icon">
              <Clock className="input-icon" size={18} />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="time-input"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Brief reason for appointment"
            className="reason-input"
            required
          />
        </div>

        <button type="submit" className="book-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
