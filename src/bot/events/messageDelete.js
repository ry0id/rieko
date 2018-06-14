const i18n = require('i18n');

module.exports = (bot, db) => {
  bot.on('messageDelete', async (message) => {
    if (!message.content || !message.channel.guild || !message.author) return;
    let event = await db.getGuild(message.channel.guild.id);
    if (!event.events.messageDelete.enabled || !event.events.messageDelete.channel) return;
    let user = message.author.toJSON();
    if (!event.events.messageDelete.embed) {
      bot.createMessage(`${event.events.messageDelete.channel}`, 'oh hi there');
    } else {
      const embed = {
        author: {
          name: user.username + '#' + user.discriminator + ' (' + user.id + ')',
          icon_url: user.avatarURL || user.defaultAvatarURL
        },
        title: bot.__('events.messageDelete.embed.title', {
          channel: '#'+message.channel.name
        }),
        footer: {
          text: ''
        },
        color: 0xFAFF00,
      };
      if (message.embeds[0]) {
        let ms = message.embeds[0];
        if ('description' in ms) embed.description = ms.description;
        if ('fields' in ms) embed.fields = ms.fields;
        if ('title' in ms) embed.title = ms.title;
				if ('color' in ms) embed.color = ms.color;
				if ('url' in ms) embed.url = ms.url;
				if ('image' in ms) embed.image = ms.image;
      } else {
        embed.description = message.content;
      }
      if (message.channel.permissionsOf(bot.user.id).has('manageGuild')) {
        let audit = await message.channel.guild.getAuditLogs(1).catch((err) => false);
        if (!audit) return;
        let footer = `${audit.entries[0].user.username + '#' + audit.entries[0].user.discriminator } ${audit.entries[0].reason ? ` | ${bot.__('words.reason')}: ${audit.entries[0].reason}` : ''}`;
        embed.footer.text = footer;
      }
      bot.createMessage(`${event.events.messageDelete.channel}`, { embed });
    }
  });
};