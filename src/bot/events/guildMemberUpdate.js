module.exports = (bot, db) => {
  bot.on('guildMemberUpdate', async(guild, member, oldMember) => {
    if (!member || !oldMember) return;
    else if (member.roles === oldMember.roles) return;
    
    
    
    let gDB = await db.getGuild(guild.id);
    if (!gDB.events.guildMemberUpdate.enabled || !gDB.events.guildMemberUpdate.channel) return;
    if (member.nick) {
      if (member.nick !== oldMember.nick) {
        bot.createMessage(gDB.events.guildMemberUpdate.channel, {
          embed: {
            title: ':pencil: Nickname Change Found!',
            description: `**${member.username + '#' + member.discriminator}** has changed their nickname from **${oldMember.nick || 'No Nickname'}** to **${member.nick || 'No Nickname'}**`,
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: bot.user.username
            }
          }
        });
      } else if (oldMember && oldMember.nick) {
        bot.createMessage(gDB.events.guildMemberUpdate.channel, {
          embed: {
            title: ':pencil: Nickname Change Found!',
            description: `**${member.username + '#' + member.discriminator}** has changed their nickname from **${oldMember.nick || 'No Nickname'}** to **No Nickname**`,
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: bot.user.username
            }
          }
        });
      }
    } else if (member.roles !== oldMember.roles) {
      bot.createMessage(gDB.events.guildMemberUpdate.channel, {
        embed: {
          title: ':pencil: User Role Change Found!',
          description: `**${member.username + '#' + member.discriminator}**`,
          timestamp: new Date(),
          footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
          }
        }
      });
    }
  });
};