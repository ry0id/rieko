module.exports = (bot, db) => {
  bot.on('guildBanAdd', async (guild, user) => {
    let audit = await guild.getAuditLogs(1).catch(err => false);
    let cases = await bot.q.fetch(`modlog_${guild.id}`);
    let gDB = await db.getGuild(guild.id);
    if (!gDB.events.guildBanAdd.enabled || !gDB.events.guildBanAdd.channel) return;
    let caseID;
    if (!gDB.misc.currentCase) caseID = 1;
    else caseID = gDB.misc.currentCase;
    let m = await bot.createMessage(`${gDB.events.guildBanAdd.channel}`, {
      embed: {
        color: 0xFF0000,
        title: bot.__('events.guildBanAdd.title', {
          case: caseID
        })
      }
    });
    console.log(cases[0]);
    console.log(cases[0].id);
    let obj = { case: 'ban', id: caseID, user, moderator: audit && audit.entries[0] ? audit.entries[0].user : false, reason: audit && audit.entries[0] ? audit.entries[0].reason : false, message: m.id};
    await bot.q.set(`modlog_${guild.id}`, { [caseID]: obj });
    await bot.q.add(`guild_${guild.id}`, 1, { target: '.misc.currentCase' });                           
  });
};