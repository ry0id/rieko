const { Command } = require('../../core');

class Help extends Command {
  constructor(bot, db) {
    super({
      command: 'help',
      category: 'General',
      aliases: [
        'halp',
        'commands'
      ],
      description: 'Helps you by telling you all the commands or one specific command.',
      usage: '{{ prefix }}help [command]',
      examples: [
        'help',
        'help ping'
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
  load(msg, args) {
    if (!args[0]) {
      const categories = {};
      const cate = { 
        General: '<:ui_star:447130204557541376> General', 
        Utility: '<:ui_i:447351491792207872> Utility',
        Profile: '<:ui_person:447698416265461760> Profile',
        Developer: '<:ui_settings:447870689823948807> Developer'
      };
      
      if (msg.author.id !== '425004634587791380') {
        this.bot.commands.filter(cmd => !cmd.hidden).forEach((cmd) => {
          let category = categories[cmd.category];

          if (!category) {
            category = categories[cmd.category] = [];
          }
          category.push(cmd.command);
        });
      } else {
        this.bot.commands.forEach((cmd) => {
          let category = categories[cmd.category];
          
          if (!category) {
            category = categories[cmd.category] = [];
          }
          category.push(cmd.command);
        });
      }
      
      msg.channel.createMessage({
        embed: {
          fields: Object.keys(categories).map((c) => ({
            name: `${cate[c]}`,
            value: `\`${categories[c].join('` `')}\``,
            inline: true
          })),
          color: 0x34363C
        }
      });
    } else {
      const command = this.bot.commands.find(c => c.command === args[0] || c.aliases.includes(args[0]));
      
      if (!command) return msg.channel.createMessage(`<:ui_x:447144294415990789> \`${args[0]}\` isn't a command.`);
      
      msg.channel.createMessage({
        embed: {
          title: `__Command - \`${command.command}\`__`,
          description: `***${command.description}***`,
          fields: [
            {
              name: 'Category',
              value: command.category,
              inline: true
            },
            {
              name: 'Aliases',
              value: command.aliases ? `\`${command.aliases.join('` `')}\`` : 'None',
              inline: true
            },
            {
              name: 'Usage',
              value: command.usage.replace('{{ prefix }}', msg.prefix),
              inline: true
            },
            {
              name: 'Examples',
              value: command.examples ? `\`${command.examples.join('` `')}\`` : 'None',
              inline: true
            },
            {
              name: 'NSFW?',
              value: command.nsfwOnly,
              inline: true
            },
            {
              name: 'Developer only?',
              value: command.ownerOnly,
              inline: true
            }
          ],
          color: 0x34363C
        }
      });
    }
  }
}

module.exports = Help;