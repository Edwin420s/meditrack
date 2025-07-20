import React from 'react';
import moment from 'moment';

const AppointmentCard = ({ appointment, onUpdate, isDoctor }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {isDoctor ? appointment.patient.name : 'Your Appointment'}
          </h3>
          <p className="text-gray-600">
            {moment(appointment.datetime).format('MMMM Do YYYY, h:mm a')}
          </p>
          <p className="mt-2">{appointment.reason}</p>
          <p className={`mt-1 ${
            appointment.status === 'completed' ? 'text-green-600' : 
            appointment.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            Status: {appointment.status}
          </p>
        </div>
        
        {isDoctor && (
          <div className="flex space-x-2">
            <button 
              onClick={() => onUpdate(appointment._id, 'completed')}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Complete
            </button>
            <button 
              onClick={() => onUpdate(appointment._id, 'cancelled')}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {appointment.notes && (
        <div className="mt-3 p-2 bg-gray-50 rounded">
          <p className="text-gray-700">{appointment.notes}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;