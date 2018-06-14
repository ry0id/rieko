const { Command } = require('../../core');
const fs = require('fs');
const path = require('path');
const util = require('util');

class Reload extends Command {
  constructor(bot, db) {
    super({
      command: 'reload',
      category: 'Developer',
      aliases: [
        'pong'
      ],
      description: 'Pong!',
      usage: '{{ prefix }}reload <all, command>',
      examples: [
        '{{ prefix }}reload reload',
        '{{ prefix }}reload all'
      ],
      hidden: true,
      ownerOnly: true,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
  }
  
  load(msg, args) { 
    if (args.length < 1) return msg.channel.createMessage('<:ui_x:> Specifiy a command or all.');
    if (args[0].toLowerCase() === 'all') {
      fs.readdir(__dirname, (error, files) => {
        if (error) return msg.channel.createMessage(':x: An error occured while getting commands files');
        for (let i = 0; i < files.length; i++) {
          try {
            delete require.cache[path.join(__dirname, files[i])];
            const Command = require(path.join(__dirname, files[i]));
						const command = new Command(this.bot, this.db);
						this.bot.commands.delete(command.command);
						command.file = path.join(__dirname, files[i]);
						this.bot.commands.set(command.command, command);
            if (i === files.length - 1) {
              msg.channel.createMessage(`<:ui_tick:447144175490826260> I've just reloaded ${files.length} commands.`);
            }
          } catch (e) {
            msg.channel.createMessage(':exclamation: An error occured while trying to reload module.\n```js\n' + util.inspect(e) + '```');
          }
        }
      });
    } else {
      let cmd = this.bot.commands.find((c) => c.command === args[0] || c.aliases.includes(args[0]));
      if (cmd.length < 1) return msg.channel.createMessage(':x: That command name was not found!');
      try {
        delete require.cache[cmd.file];
        const Command = require(cmd.file);
        const command = new Command(this.bot, this.db);
        this.bot.commands.delete(command.command);
        command.file = cmd.file;
        this.bot.commands.set(command.command, command);
        msg.channel.createMessage(`<:ui_tick:447144175490826260> I've just reloaded ${command.command} command.`);
      } catch (e) {
        msg.channel.createMessage(':exclamation: An error occured while trying to reload module.\n```js\n' + util.inspect(e) + '```');
      }
    }
  }
}

module.exports = Reload;