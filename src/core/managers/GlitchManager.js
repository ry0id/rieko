<<<<<<< HEAD
const express = require('express');
const http = require('http');

class GlitchManager {
  constructor() {
    this.app = express();
  }
  load() {
    this.app.get('/', (req, res) => {
      console.log('Ping received!');
      res.sendStatus(100);
    });
    this.app.listen(process.env.PORT);
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
    }, 280000);
  }
}

=======
const express = require('express');
const http = require('http');

class GlitchManager {
  constructor() {
    this.app = express();
  }
  load() {
    this.app.get('/', (req, res) => {
      console.log('Ping received!');
      res.sendStatus(100);
    });
    this.app.listen(process.env.PORT);
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
    }, 280000);
  }
}

>>>>>>> 900bae64de5b33996f01a427b6f870c75003e083
module.exports = GlitchManager;