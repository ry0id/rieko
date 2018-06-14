const { Command } = require('../../core');

class Stats extends Command {
  constructor(bot, db) {
    super({
      command: 'stats',
      category: 'Utility',
      aliases: [
        'botinfo',
        'statistics'
      ],
      description: 'Gives you information about Rieko.',
      usage: '{{ prefix }}stats',
      examples: [
        '{{ prefix }}stats'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
    this.ms = require('pretty-ms');
  }
  
  load(msg) { 
    msg.channel.createMessage({
      embed: {
        title: msg.__('commands.stats.title'),
        fields: [
          {
            name: msg.__('commands.stats.fields.one.name'),
            value: `Rieko: v${require('../../../package.json').version}\nEris: v${require('eris').VERSION}\nNode: ${process.version}`,
            inline: true
          },
          {
            name: msg.__('commands.stats.fields.two.name'),
            value: msg.__('commands.stats.fields.two.value', {
              guilds: this.bot.guilds.size,
              chans: Object.keys(this.bot.channelGuildMap).length,
              users: this.bot.users.size
            }),
            inline: true
          },
          {
            name: msg.__('commands.stats.fields.third.name'),
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            inline: true
          },
          {
            name: msg.__('commands.stats.fields.forth.name'),
            value: this.ms(this.bot.uptime),
            inline: true
          }
        ],
        footer: { 
          text: `${msg.__('commands.general_commands', { size: this.bot.commands.filter(c => !c.hidden).length })} | ${msg.__('commands.general_request', { username: msg.author.username, discrim: msg.author.discriminator})}` 
        },
        color: 0xFF0C0C
      }
    });
  }
}

module.exports = Stats;