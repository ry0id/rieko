const { Command } = require('../../core');

class Ping extends Command {
  constructor(bot, db) {
    super({
      command: 'ping',
      category: 'General',
      aliases: [
        'pong'
      ],
      description: 'Pong!',
      usage: '{{ prefix }}ping',
      examples: [
        '{{ prefix }}ping'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
  }
  
  load(msg) { 
    msg.channel.createMessage(msg.__('commands.ping.start')).then((mes) => {
      mes.edit(msg.__('commands.ping.edited', {
        ping: (Date.now() - mes.timestamp)
      }));
    });
  }
}

module.exports = Ping;