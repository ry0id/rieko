const { Command, resolveUser } = require('../../core');

class Poke extends Command {
  constructor(bot, db) {
    super({
      command: 'poke',
      category: 'Action',
      aliases: [],
      description: 'stop poking me. ;*)',
      usage: '{{ prefix }}poke <user mention|user name|user id>',
      examples: [
        '{{ prefix }}poke murf'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
    this.user = new resolveUser(this.bot, this.db);
  }
  
  load(msg, args) { 
    this.user.resolve(args.length > 0 ? args.join(' ') : msg.author.id).then((user) => {
      this.bot.snek.get('https://rieko.glitch.me/api/img/poke')
        .then((r) => {
          if (user.id === msg.author.id) {
            msg.channel.createMessage({ 
              content: msg.__('commands.poke.u_content'),
              embed: {
                color: 0xEDA934,
                image: {
                  url: r.body.url
                },
                footer: {
                  text: msg.__('commands.api.rieko')
                }
              }
            });
          } else {
            msg.channel.createMessage({ 
              content: msg.__('commands.poke.content', {
                author: msg.author.username,
                member: user.username
              }),
              embed: {
                color: 0xEDA934,
                image: {
                  url: r.body.url
                },
                footer: {
                  text: msg.__('commands.api.rieko')
                }
              }
            });
          }
        })
    }).catch((err) => {
      msg.channel.createMessage(msg.__('commands.unknownUser'));
    });
  }
}

module.exports = Poke;