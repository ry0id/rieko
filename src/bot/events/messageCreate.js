const i18n = require('i18n');

module.exports = (bot, db) => {
  bot.on('messageCreate', async (msg) => {
    if (msg.author.bot || !bot.ready) return;
    let gDB = await db.fetch(`guild_${msg.channel.guild.id}`);
    if (!gDB) {
      db.set(`guild_${msg.channel.guild.id}`, {
        id: msg.channel.guild.id,
        prefix: 'r.',
        misc: {
          locale: 'en_UK',
          disabledCommands: [],
          blacklistedUsers: [],
          blacklistedChannels: []
        }
      });
    }
    let prefix = gDB.prefix;
    if (!msg.content.startsWith(prefix)) return;
    msg.prefix = prefix;
    i18n.init(msg);
    i18n.setLocale(gDB.misc.locale);
    const command = msg.content.split(' ')[0].replace(prefix, '').toLowerCase();
		const commands = bot.commands.filter((c) => c.command === command || c.aliases.includes(command));
		const args = msg.content.replace(/ {2,}/g, ' ').replace(prefix, '').split(' ').slice(1);
    if (commands.length > 0) {
      try {
        commands[0].load(msg, args);
      } catch (err) {
        msg.channel.createMessage(i18n.__('commands.general_error'));
      }
    }
  });
};
