const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.createAppointment = async (req, res) => {
  const { datetime, reason } = req.body;
  
  try {
    const newAppointment = new Appointment({
      patient: req.user.id,
      datetime,
      reason
    });

    const appointment = await newAppointment.save();
    
    // Emit real-time update
    req.io.emit('new_appointment', appointment);
    
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'doctor') {
      appointments = await Appointment.find()
        .populate('patient', 'name email phone')
        .sort({ datetime: 1 });
    } else {
      appointments = await Appointment.find({ patient: req.user.id })
        .sort({ datetime: 1 });
    }
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateAppointment = async (req, res) => {
  const { status, notes } = req.body;
  
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    appointment.status = status || appointment.status;
    appointment.notes = notes || appointment.notes;
    
    const updatedAppointment = await appointment.save();
    
    // Emit real-time update
    req.io.emit('appointment_update', updatedAppointment);
    
    res.json(updatedAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};