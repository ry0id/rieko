const { Router } = require('express');

const router = Router();

// Arrays ;-;
let endpoints = [
  "HEAD,GET,OPTIONS    /api/b",
  "HEAD,GET,OPTIONS    /api/endpoints",
  "HEAD,GET,OPTIONS    /api/img/<'sloth', 'poke'>"
]

let sloths = [
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/01.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/02.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/03.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/04.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/05.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/06.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/07.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/08.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/09.jpg",
  "https://res.cloudinary.com/murf/image/upload/v1527770919/Sloths/10.jpg",
];

let poke = [
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/01.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/02.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/03.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/04.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/05.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/06.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/07.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/08.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/09.gif",
  "https://res.cloudinary.com/murf/image/upload/v1527791232/Poke/10.gif"
];

module.exports = (i18n) => {
  
  router.get('/', (req, res) => res.redirect('/api/endpoints'));
  
  router.get('/endpoints', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(endpoints, null, 3));
  });
  
  router.get('/img/sloth', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
      url: sloths[Math.floor(Math.random() * sloths.length)]
    }, null, 3));
  });
  
  router.get('/img/poke', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
      url: poke[Math.floor(Math.random() * poke.length)]
    }, null, 3));
  });
  
  router.get('/b', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let msg = req.query.text;
    if (!msg || msg.length > 200) {
      return res.send(JSON.stringify({
        msg: i18n.__('website.api.b.missing')
      }, null, 3));
    }
    if (!msg.includes('b') || !msg.includes('b')) {
      return res.send(JSON.stringify({
        msg: i18n.__('website.api.b.none')
      }, null, 3));
    }
    res.status(200).send(JSON.stringify({
      msg: msg.replace(/b/gi, '🅱')
    }, null, 3));
  });
  
  return router;
};