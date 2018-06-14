module.exports = (bot, db) => {
  bot.on('guildMemberAdd', async (guild, member) => {
    if (guild.id === '446703400122318850') {
      if (member.bot) {
        member.addRole('449919065457295360');
      } else {
        member.addRole('449918627802644490');
      }
    }
  });
};