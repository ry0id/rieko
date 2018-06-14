const { Command } = require('../../core');

class Prefix extends Command {
  constructor(bot, db) {
    super({
      command: 'prefix',
      category: 'Moderation',
      aliases: [
        'set-prefix'
      ],
      description: 'Pong!',
      usage: '{{ prefix }}ping',
      examples: [
        '{{ prefix }}ping'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
  }
  
  async load(msg, args) { 
    const delarray = [];
    const cleanup = async () => {
      if (msg.channel.type === 0 && msg.channel.permissionsOf(this.bot.user.id).has('manageMessages')) {
        msg.channel.deleteMessages(delarray);
      }
    };
    let toPrefix;
    if (args.length === 0) {
      msg.channel.createMessage('<:ui_x:447144294415990789> Enter your new prefix by typing.\nThe current prefix for this server is `' + msg.prefix + '`\nTo cancel, simply write `cancel` or `c` and it will cancel it.')
      .then(m => delarray.push(m.id));
      const awaitPrefix = await this.bot.messageCollector.awaitMessage(msg.channel.id, msg.author.id, 60000);
      if (!awaitPrefix || awaitPrefix.content.toLowerCase() === 'cancel' || awaitPrefix.content.toLowerCase() === 'c') {
        return msg.channel.createMessage('<:ui_x:447144294415990789> Prompt timed out.')
      } else if (!awaitPrefix.cleanContent) {
        return msg.channel.createMessage('<:ui_x:447144294415990789> Only text works.');
      } 
      toPrefix = awaitPrefix.content;
    } else { toPrefix = args.join(' ') }
    if (msg.channel.type === '1') return msg.channel.createMessage('<:ui_x:447144294415990789> The custom prefix only works in a guild.');
    if (!msg.member.permission.has('manageChannels') && msg.author.id !== msg.channel.guild.ownerID && msg.author.id !== '425004634587791380') return msg.channel.createMessage('<:ui_x:447144294415990789> You do not have the right permission to change the guilds\'s prefix. You need the permission `Manage Guild`.');
    if (toPrefix.length > 10) return msg.channel.createMessage('<:ui_x:447144294415990789> The prefix cannot be no longer than ten characters!');
    this.db.updateGuild(msg.channel.guild.id, toPrefix, 'prefix').then(() => {
      msg.channel.createMessage(`<:ui_tick:447144175490826260> You have changed the server's prefix to \`${toPrefix}\``);
    });
    cleanup();
  }
}

module.exports = Prefix;