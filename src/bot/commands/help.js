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
        '{{ prefix }}help',
        '{{ prefix }}help ping'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
  }
  load(msg, args) {
    if (!args[0]) {
      const categories = [];
      this.bot.commands.filter(cmd => !cmd.hidden).forEach((c) => {
        const filter = categories.filter((f) => f.name.split(' • ')[0] === c.category);
        if (filter.length > 0) {
				  categories[categories.indexOf(filter[0])].value += ', `' + c.command + '`';
			  } else {
				  categories[categories.length] = {
					  name: c.category + ' • ' + this.bot.commands.filter(cmd => cmd.category === c.category).length,
					  value: '`' + c.command + '`',
					  inline: false
				  };
			  }
      });
      categories.sort((a, b) => {
			  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
			  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
			  return 0;
		  });
      msg.channel.createMessage({
        embed: {
          fields: categories,
          color: 0x0AF2FF
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
              value: command.examples ? `\`${command.examples.join('`, `').replace(/{{ prefix }}/gi, msg.prefix)}\`` : 'None',
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
          color: 0xFF047
        }
      });
    }
  }
}

module.exports = Help;