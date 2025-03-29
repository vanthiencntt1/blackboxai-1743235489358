const express = require('express');
const PatientController = require('./patient.controller');

const router = express.Router();
const patientController = new PatientController();

// Get all patients
router.get('/', (req, res) => {
  res.json(patientController.getAllPatients());
});

// Get single patient
router.get('/:id', (req, res) => {
  const patient = patientController.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

// Add new patient
router.post('/', (req, res) => {
  const newPatient = patientController.addPatient(req.body);
  res.status(201).json(newPatient);
});

// Update patient
router.put('/:id', (req, res) => {
  const updatedPatient = patientController.updatePatient(req.params.id, req.body);
  if (updatedPatient) {
    res.json(updatedPatient);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

// Delete patient
router.delete('/:id', (req, res) => {
  patientController.deletePatient(req.params.id);
  res.status(204).end();
});

module.exports = router;