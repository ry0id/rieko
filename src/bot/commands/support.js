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
        'support'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
    this.i18n = require('i18n');
  }
  
  load(msg) { 
    return msg.channel.createMessage({
      embed: {
        title: msg.__('commands.support.title'),
        description: msg.__('commands.support.description'),
        color: 0x34363C,
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