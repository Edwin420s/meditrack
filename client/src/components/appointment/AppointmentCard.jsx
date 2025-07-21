import React from 'react';
import moment from 'moment';

const AppointmentCard = ({
  appointment,
  doctor,
  specialty,
  location,
  action,
  onUpdate,
  isDoctor,
}) => {
  // Static preview mode (placeholder)
  if (!appointment) {
    return (
      <div className="appointment-card bg-white rounded-lg shadow p-4 mb-4">
        <div className="card-header mb-2">
          <h3 className="font-semibold text-lg">Your Appointment</h3>
        </div>
        <div className="card-body">
          <h4 className="text-md font-bold">{doctor}</h4>
          <p className="text-gray-600">{specialty} | {location}</p>
        </div>
        <div className="card-footer mt-4">
          <button className="border px-4 py-1 rounded text-sm hover:bg-gray-100">
            {action}
          </button>
        </div>
      </div>
    );
  }

  // Dynamic mode (appointment info)
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {isDoctor ? appointment.patient?.name : 'Your Appointment'}
          </h3>
          <p className="text-gray-600">
            {moment(appointment.datetime).format('MMMM Do YYYY, h:mm a')}
          </p>
          <p className="mt-2">{appointment.reason}</p>
          <p
            className={`mt-1 text-sm ${
              appointment.status === 'completed'
                ? 'text-green-600'
                : appointment.status === 'cancelled'
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            Status: {appointment.status}
          </p>
        </div>

        {isDoctor && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onUpdate(appointment._id, 'completed')}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              Complete
            </button>
            <button
              onClick={() => onUpdate(appointment._id, 'cancelled')}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {appointment.notes && (
        <div className="mt-3 p-3 bg-gray-50 border rounded">
          <p className="text-gray-700 text-sm">{appointment.notes}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
