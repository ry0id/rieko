module.exports = (bot) => ({
  initGuild: async function (guildID) {
    await bot.q.set(`guild_${guildID}`, {
      id: guildID,
      prefix: 'r.',
      misc: {
        locale: 'en_UK',
        disabledCommands: [],
        blacklistedUsers: [],
        blacklistedChannels: []
      },
      events: {
        messageDelete: {
          enabled: false,
          channel: false
        }
      }
    });
  },
  getGuild: async function (guildID, target) {
    if (!target) {
      return await bot.q.fetch(`guild_${guildID}`);
    } else {
      return await bot.q.fetch(`guild_${guildID}`, { targt: `.${target}` });
    }
  },
  updateGuild: async function (guildID, value, target) {
    return await bot.q.set(`guild_${guildID}`, value, { target: `.${target}` });
  },
  deleteGuild: async function (guildID) {
    return await bot.q.delete(`guild_${guildID}`);
  },
  initUser: async function (userID) {
    return bot.q.set(`profile_${userID}`, {
      balance: 0,                                           
      biography: null, 
      pfpUrl: null,
      banner: null,
    });
  },
  getUser: async function (userID, target) {
    if (!target) {
      return await bot.q.fetch(`profile_${userID}`);
    } else {
      return await bot.q.fetch(`profile_${userID}`, { target: `.${target}` });
    }
  },
});