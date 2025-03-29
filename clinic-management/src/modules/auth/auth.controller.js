class AuthController {
  constructor() {
    this.users = [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
      { id: 2, username: 'doctor', password: 'doctor123', role: 'doctor' }
    ];
  }

  login(username, password) {
    const user = this.users.find(u => 
      u.username === username && u.password === password
    );
    return user || null;
  }

  logout(session) {
    session.destroy();
  }
}

module.exports = AuthController;