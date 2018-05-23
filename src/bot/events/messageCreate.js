const i18n = require('i18n');

module.exports = (bot, db) => {
  bot.on('messageCreate', async (msg) => {
    if (msg.author.bot || !bot.ready) return;
    let gDB = await db.getGuild(msg.channel.guild.id);
    if (!gDB) {
      await db.initGuild(msg.channel.guild.id);
    }
    if (!msg.content.startsWith(gDB.prefix)) return;
    let prefix = gDB.prefix;
    msg.prefix = gDB.prefix;
    i18n.init(msg);
    i18n.setLocale(gDB.misc.locale);
    const command = msg.content.split(' ')[0].replace(prefix, '').toLowerCase();
		const commands = bot.commands.filter((c) => c.command === command || c.aliases.includes(command));
		const args = msg.content.replace(/ {2,}/g, ' ').replace(prefix, '').split(' ').slice(1);
    if (commands.length > 0) {
      if (commands[0].ownerOnly && msg.author.id !== '425004634587791380') return msg.channel.createMessage(msg.__('commands.general_notOwner'));
      if (gDB.misc.disabledCommands.includes(commands[0].command)) return;
      if (gDB.misc.blacklistedUsers.includes(msg.author.id)) return;
      if (gDB.misc.blacklistedChannels.includes(msg.channel.id)) return;
      try {
        commands[0].load(msg, args);
      } catch (err) {
        msg.channel.createMessage(i18n.__('commands.general_error'));
        console.log(`Command, ${commands[0].command}, failed and heres the error: ${err}`);
      }
    }
  });
};