const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 8000;

// Static files must come first
app.use(express.static(path.join(__dirname, 'public')));

// Other middleware
app.use(express.json());
app.use(session({
  secret: 'clinic_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Authentication middleware
const requireAuth = (roles = []) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.status(403).render('403.html');
    }
    next();
  };
};

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// API Routes
const patientRoutes = require('./src/modules/patients/patient.routes');
const authRoutes = require('./src/modules/auth/auth.routes');
app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);

// Frontend Routes
app.get('/login', (req, res) => {
  res.render('login.html');
});

// Protect all routes except login
app.get('/', requireAuth, (req, res) => {
  res.render('index.html');
});

app.get('/patients', requireAuth, (req, res) => {
  res.render('patients.html');
});

app.get('/doctors', requireAuth(['admin', 'doctor']), (req, res) => {
  res.render('doctors.html');
});

app.get('/appointments', requireAuth, (req, res) => {
  res.render('appointments.html');
});

app.get('/billing', requireAuth, (req, res) => {
  res.render('billing.html');
});

app.get('/medical-records', requireAuth(['doctor', 'admin']), (req, res) => {
  res.render('medical-record.html');
});

// Start server
app.listen(port, () => {
  console.log(`Clinic management system running on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api/patients`);
});
