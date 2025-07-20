const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
exports.createAppointment = async (req, res) => {
  const { datetime, reason } = req.body;

  try {
    const newAppointment = new Appointment({
      patient: req.user.id,
      datetime,
      reason
    });

    const appointment = await newAppointment.save();
    res.status(201).json(appointment);

    // Emit real-time update after response
    req.io.emit('new_appointment', appointment);
  } catch (err) {
    console.error('[Create Appointment]', err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private (Patient or Doctor)
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
    console.error('[Get Appointments]', err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update appointment status and/or notes
// @route   PUT /api/appointments/:id
// @access  Private (Doctor only)
exports.updateAppointment = async (req, res) => {
  const { status, notes } = req.body;

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);

    // Emit real-time update after saving
    req.io.emit('appointment_update', updatedAppointment);
  } catch (err) {
    console.error('[Update Appointment]', err.message);
    res.status(500).send('Server error');
  }
};
