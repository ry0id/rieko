const { Canvas } = require('canvas-constructor');
const { registerFont } = require('canvas');
const { readFile } = require('fs-nextra');
registerFont('./assets/fonts/Futura.otf', { family: 'balance' });
registerFont('./assets/fonts/discord.ttf', { family: 'b1nzy' });

module.exports = (bot) => ({
  balance: async function (msg, member, amount, channelID) {
    let res = await readFile('./assets/images/balance.jpg');
    let img = new Canvas(2048, 779)
    .addImage(res, 0, 0, 2048, 779)
    .setTextFont('200px balance')
    .setColor('#FFFFFF')
    .addText(`${member.username}#${member.discriminator}`, 19, 351)
    .addText(`¥ ${amount}`, 19, 550)
    .toBuffer();
    bot.createMessage(channelID, msg.__('commands.balance.content', { 
      username: member.username, 
      discrim: member.discriminator 
    }), {
      file: img,
      name: 'balance.jpg'
    });
  },
  
  profile: async function (msg, member, channelID) {
    let pmDB = await bot.db.fetch(`profile_${member.id}`);
    let res = await readFile('./assets/images/profile.jpg');
    let img = new Canvas(1553, 1536)
    .toBuffer();
    bot.createMessage(channelID, msg.__('commands.profile.content', {
      username: member.username,
      discrim: member.discriminator
    }), {
      file: img,
      name: 'profile.jpg'
    });
  },
  
  b1nzy: async function (str, channelID) {
    let res = await readFile('./assets/images/b1nzy.png');
    let img = new Canvas(489, 109)
    .addImage(res, 0, 0, 489, 109)
    .setTextFont('16px b1nzy')
    .setColor('#FFFFFF')
    .addText(str, 80, 25, 450)
    .toBuffer();
    bot.createMessage(channelID, '', {
      file: img,
      name: 'bad-b1nzy.png'
    });
  }
});