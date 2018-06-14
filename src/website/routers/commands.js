const { Router } = require('express');

const router = Router();

module.exports = (bot) => {
  
  router.get('/', (req, res) => {
    const categories = [];
    bot.commands.filter((command) => !command.hidden).forEach((command) => {
      
    });
  });
  
  return router;
};