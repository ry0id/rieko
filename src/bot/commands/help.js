const { Command } = require('../../core');

class Help extends Command {
  constructor(bot, db) {
    super({
      command: 'help',
      category: 'Utility',
      aliases: [
        'halp',
        'commands'
      ],
      description: 'Helps you by telling you all the commands or one specific command.',
      usage: '{{ prefix }}help [command]',
      examples: [
        '{{ prefix }}help',
        '{{ prefix }}help ping'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false
    });
    this.bot = bot;
    this.db = db;
    this.i18n = require('i18n');
  }
  load(msg, args) {
    if (!args[0]) {
      const categories = {};
      this.bot.commands.filter((command) => !command.hidden).forEach((command) => {
			  if (!(command.category in categories)) categories[command.category] = [];
			  categories[command.category].push(command.command);
		  });
      for (const category in categories) {
        msg.channel.createMessage({
          content: msg.__('commands.help.content', { 
            prefix: msg.prefix
          }),
          embed: {
            title: `${this.bot.commands.size} Commands`,
            fields: [{
              name: `**__${category}__**`,
              value: `${categories[category].map((command) => '`' + command + '`').join('   ')}`,
              inline: true
            }],
            color: 0xFF1485
          }
        });
      }
    } else {
      const command = this.bot.commands.find((c) => c.command === args[0] || c.aliases.includes(args[0]));
      if (!command) {
        return msg.channel.createMessage(':x: Sorry but `' + args[0] + '` isn\'t a commmand.');
      }
      msg.channel.createMessage({
        content: msg.__('commands.help.content_command', {
          command: command.command
        }),
        embed: {
          title: `Command ${command.command}`,
          description: `***${command.description}***`,
          fields: [
            {
              name: 'Category',
              value: command.category,
              inline: true
            },
            {
              name: 'Aliases',
              value: command.aliases ? `\`${command.aliases.join('`, `')}\`` : 'None',
              inline: true
            },
            {
              name: 'Usage',
              value: command.usage.replace('{{ prefix }}', msg.prefix),
              inline: true
            },
            {
              name: 'Examples',
              value: command.examples ? `\`${command.examples.join('`, `').replace('{{ prefix }}', msg.prefix)}\`` : 'None',
              inline: true
            },
            {
              name: 'NSFW?',
              value: {true:'Yes',false:'No'}[command.nsfwOnly],
              inline: true
            },
            {
              name: 'Developer Only?',
              value: {true:'Yes',false:'No'}[command.ownerOnly],
              inline: true
            }
          ],
          color: 0xFF1485
        }
      });
    }
  }
}

module.exports = Help;