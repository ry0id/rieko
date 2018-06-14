const { Command, resolveUser } = require('../../core');

class Kiss extends Command {
  constructor(bot, db) {
    super({
      command: 'kiss',
      category: 'Action',
      aliases: [
        'snog'
      ],
      description: 'Kiss someone. ;*)',
      usage: '{{ prefix }}kiss <user mention|user name|user id>',
      examples: [
        '{{ prefix }}kiss murf'
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
      this.bot.snek.get('https://nekos.life/api/v2/img/kiss')
        .then((r) => {
          if (user.id === msg.author.id) {
            msg.channel.createMessage({ 
              content: msg.__('commands.kiss.u_content'),
              embed: {
                color: 0xEDA934,
                image: {
                  url: r.body.url
                },
                footer: {
                  text: msg.__('commands.api.nekos_life')
                }
              }
            });
          } else {
            msg.channel.createMessage({ 
              content: msg.__('commands.kiss.content', {
                author: msg.author.username,
                member: user.username
              }),
              embed: {
                color: 0xEDA934,
                image: {
                  url: r.body.url
                },
                footer: {
                  text: msg.__('commands.api.nekos_life')
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

module.exports = Kiss;