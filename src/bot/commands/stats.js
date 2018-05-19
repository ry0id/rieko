const { Command } = require('../../core');

class Stats extends Command {
  constructor(bot, db) {
    super({
      command: 'stats',
      category: 'Utility',
      aliases: [
        'botinfo'
      ],
      description: 'Gives you information about Rieko.',
      usage: '{{ prefix }}stats',
      examples: [
        'stats'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false
    });
    this.bot = bot;
    this.db = db;
    this.ms = require('pretty-ms');
  }
  
  load(msg) { 
    msg.channel.createMessage({
      embed: {
        title: '<:ui_burger:447377504974667796> Rieko\'s Stats',
        fields: [
          {
            name: '<:ui_i:447351491792207872> Versions',
            value: `Rieko: ${require('../../../package.json').version}\nEris: v${require('eris').VERSION}\nNode: ${process.version}`,
            inline: true
          },
          {
            name: '<:ui_li:447380031870730271> Guild, Channels & Users',
            value: `Guilds: ${this.bot.guilds.size}\nChannels: ${Object.keys(this.bot.channelGuildMap).length}\nUsers: ${this.bot.users.size}`,
            inline: true
          },
          {
            name: '<:ui_graph:447381653694840842> Memory Usage',
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            inline: true
          },
          {
            name: '<:ui_clock:447381653648572427> Uptime',
            value: this.ms(this.bot.uptime),
            inline: true
          }
        ],
        footer: { 
          text: `${this.bot.commands.size} Commands | Requested by ${msg.author.username + '#' + msg.author.discriminator}` 
        },
        color: 0x34363C
      }
    });
  }
}

module.exports = Stats;