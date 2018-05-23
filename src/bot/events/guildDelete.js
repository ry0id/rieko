module.exports = (bot, db) => {
  bot.on('guildDelete', async (guild) => {
    await db.deleteGuild(guild.id);
    
    await this.bot.webhook.send({
      title: '<:ui_output:447129301179957248> Guild Left',
      description: `I have left ${guild.name} :(`,
      color: 0x34363C
    });
  });
};