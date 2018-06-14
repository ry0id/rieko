const { Command } = require('../../core');

class Sloth extends Command {
  constructor(bot, db) {
    super({
      command: 'sloth',
      category: 'Animal',
      aliases: [],
      description: 'What a cute sloth. <3',
      usage: '{{ prefix }}sloth',
      examples: [
        '{{ prefix }}sloth'
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
    this.bot.snek.get('https://rieko.glitch.me/api/img/sloth').then((r) => {
      msg.channel.createMessage({ 
        content: msg.__('commands.sloth.content'),
        embed: {
          color: 0xB5A699,
          image: {
            url: r.body.url
          },
          footer: {
            text: msg.__('commands.api.rieko')
          }
        }
      });
    });
  }
}

module.exports = Sloth;