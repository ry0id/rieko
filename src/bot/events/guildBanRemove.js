module.exports = (bot, db) => {
  bot.on('guildBanRemove', async (guild, user) => {
    let audit = await guild.getAuditLogs(1).catch(err => false);
    let cases = await bot.q.fetch(`modlog_${guild.id}`);
    let gDB = await db.getGuild(guild.id);
    if (!gDB.events.guildBanRemove.enabled || !gDB.events.guildBanRemove.channel) return;
    let caseID;
    if (!gDB.misc.currentCase) caseID = 1;
    else caseID = gDB.misc.currentCase;
    let m = await bot.createMessage(`${gDB.events.guildBanRemove.channel}`, {
      embed: {
        title: bot.__('events.guildBanRemove.title', {
          case: caseID
        }),
        color: 0x4CFF00
      }
    });
    //console.log(cases[0].id);
    let obj = { case: 'unban', id: caseID, user, moderator: audit && audit.entries[0] ? audit.entries[0].user : false, reason: audit && audit.entries[0] ? audit.entries[0].reason : false, message: m.id};
    await bot.q.set(`modlogs_${guild.id}`, { [caseID]: obj });
    await bot.q.add(`guild_${guild.id}`, 1, { target: '.misc.currentCase' });                           
  });
};