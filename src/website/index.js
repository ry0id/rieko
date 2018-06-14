const express = require('express');
const http = require('http');
const { join } = require('path');
const bodyParser = require('body-parser');
const i18n = require('i18n');

// Routers
const api = require('./routers/api');

i18n.configure({
	directory: join(__dirname, '..', 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

class Website {
  constructor(bot, db) {
    this.app = express();
    this.bot = bot;
    this.db = db;
    this.init();
  }
  
  init() {
    this.app.set('view engine', 'pug');
    this.app.set('views', join(__dirname, 'dynamic'));
    this.app.use(i18n.init);
    let tran;
    i18n.init();
    
    this.app.get('/', (req, res) => {
      res.render('index.pug');
    });
    
    this.app.use('/api', api(i18n));
    
    this.app.get('/invite', (req, res) => {
      res.redirect('https://discordapp.com/oauth2/authorize?client_id=446701624371707905&scope=bot&permissions=536341759');
    });
    
    this.app.get('/invite/:id', (req, res) => {
      res.redirect('https://discordapp.com/oauth2/authorize?client_id=446701624371707905&scope=bot&permissions=536341759&guild_id=' + req.params.id);
    });
    
    this.app.get('/support', (req, res) => {
      res.redirect('https://discord.gg/8xAkM7u');
    });
    
    this.app.use(express.static(join(__dirname, 'static')));
    
    this.app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}.`);
    });
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
    }, 280000);
  }
}

module.exports = Website;