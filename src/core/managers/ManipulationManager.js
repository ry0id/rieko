const { Canvas } = require('canvas-constructor');
const { registerFont } = require('canvas');
const { readFile } = require('fs-nextra');
registerFont('./assets/fonts/Futura.otf', { family: 'balance' });

module.exports = (bot) => ({
  balance: async function (member, amount, channelID) {
    let res = await readFile('./assets/images/balance.jpg');
    let img = new Canvas(2048, 779)
    .addImage(res, 0, 0, 2048, 779)
    .setTextFont('200px balance')
    .setColor('#FFFFFF')
    .addText(`${member.username}#${member.discriminator}`, 19, 351)
    .addText(`¥ ${amount}`, 19, 550)
    .toBuffer();
    bot.createMessage(channelID, `<:ui_paper:447352551377993738> **${member.username}#${member.discriminator}**'s balance`, {
      file: img, name: 'balance.jpg' 
    });
  }
});