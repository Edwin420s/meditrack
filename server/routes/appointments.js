// routes/appointments.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/', auth('patient'), appointmentController.createAppointment);
router.get('/', auth(), appointmentController.getAppointments);
router.put('/:id', auth('doctor'), appointmentController.updateAppointment);

module.exports = router;
