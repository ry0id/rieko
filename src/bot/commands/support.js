const { Command } = require('../../core');

class Support extends Command {
  constructor(bot, db) {
    super({
      command: 'support',
      category: 'General',
      aliases: [
        'support-server'
      ],
      description: 'Join Rieko\'s support server.',
      usage: '{{ prefix }}support',
      examples: [
        '{{ prefix }}support'
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
    return msg.channel.createMessage({
      embed: {
        title: msg.__('commands.support.title'),
        description: msg.__('commands.support.description'),
        color: 0xFF0CDA,
        fields: [
          {
            name: msg.__('commands.support.fields.name'),
            value: msg.__('commands.support.fields.value'),
            inline: true
          }
        ],
        footer: {
          text:  msg.__('commands.general_request', { username: msg.author.username, discrim: msg.author.username })
        }
      }
    });
  }
}

module.exports = Support;