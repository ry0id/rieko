<<<<<<< HEAD
const { Command } = require('../../core');

class Ping extends Command {
  constructor(bot, db) {
    super({
      command: 'ping',
      category: 'Utility',
      aliases: [
        'pong'
      ],
      description: 'Pong!',
      usage: '{{ prefix }}ping',
      examples: [
        '{{ prefix }}ping'
      ],
      hidden: false
    });
    this.bot = bot;
    this.db = db;
    this.i18n = require('i18n');
  }
  
  load(msg) { 
    msg.channel.createMessage(msg.__('commands.ping.start')).then((mes) => {
      mes.edit(msg.__('commands.ping.edited', {
        ping: (Date.now() - mes.timestamp)
      }));
    });
  }
}

=======
const { Command } = require('../../core');

class Ping extends Command {
  constructor(bot, db) {
    super({
      command: 'ping',
      category: 'Utility',
      aliases: [
        'pong'
      ],
      description: 'Pong!',
      usage: '{{ prefix }}ping',
      examples: [
        '{{ prefix }}ping'
      ],
      hidden: false
    });
    this.bot = bot;
    this.db = db;
    this.i18n = require('i18n');
  }
  
  load(msg) { 
    msg.channel.createMessage(msg.__('commands.ping.start')).then((mes) => {
      mes.edit(msg.__('commands.ping.edited', {
        ping: (Date.now() - mes.timestamp)
      }));
    });
  }
}

>>>>>>> 900bae64de5b33996f01a427b6f870c75003e083
module.exports = Ping;