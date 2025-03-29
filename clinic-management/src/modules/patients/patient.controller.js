class PatientController {
  constructor() {
    this.patients = [];
  }

  getAllPatients() {
    return this.patients;
  }

  getPatientById(id) {
    return this.patients.find(patient => patient.id === id);
  }

  addPatient(patientData) {
    const newPatient = {
      id: Date.now().toString(),
      ...patientData
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  updatePatient(id, updatedData) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients[index] = {...this.patients[index], ...updatedData};
      return this.patients[index];
    }
    return null;
  }

  deletePatient(id) {
    this.patients = this.patients.filter(patient => patient.id !== id);
  }
}

module.exports = PatientController;