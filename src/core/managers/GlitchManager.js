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

module.exports = GlitchManager;