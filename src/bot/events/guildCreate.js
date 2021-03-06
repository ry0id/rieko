module.exports = (bot, db) => {
  bot.on('guildCreate', async (guild) => {
    await db.initGuild(guild.id);
    this.bot.webhook.send({
      title: '<:ui_input:447128893128835073> Guild Joined',
      description: `I have joined ${guild.name} :)`,
      color: 0x34363C
    });
    guild.members.forEach(async (m) => {
      await db.initUser(m.id);
    });
  });
};