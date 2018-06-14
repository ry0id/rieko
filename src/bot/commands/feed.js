const { Command, resolveUser } = require('../../core');

class Feed extends Command {
  constructor(bot, db) {
    super({
      command: 'feed',
      category: 'Action',
      aliases: [],
      description: 'Feed someone. ;*)',
      usage: '{{ prefix }}feed <user mention|user name|user id>',
      examples: [
        '{{ prefix }}feed murf'
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
      this.bot.snek.get('https://nekos.life/api/v2/img/feed')
        .then((r) => {
          if (user.id === msg.author.id) {
            msg.channel.createMessage({
              content: msg.__('commands.feed.u_content'),
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
              content: msg.__('commands.feed.content', {
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

module.exports = Feed;