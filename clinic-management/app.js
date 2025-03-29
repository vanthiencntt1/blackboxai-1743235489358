const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// API Routes
const patientRoutes = require('./src/modules/patients/patient.routes');
app.use('/api/patients', patientRoutes);

// Frontend Routes
app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/patients', (req, res) => {
  res.render('patients.html');
});

app.get('/doctors', (req, res) => {
  res.render('doctors.html');
});

app.get('/appointments', (req, res) => {
  res.render('appointments.html');
});

app.get('/billing', (req, res) => {
  res.render('billing.html');
});

// Start server
app.listen(port, () => {
  console.log(`Clinic management system running on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api/patients`);
});
