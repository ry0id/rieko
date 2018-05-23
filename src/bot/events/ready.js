module.exports = (bot, db) => {
  bot.on('ready', () => {
    bot.editStatus('dnd', {
      name:'In Development | r.help',
      type: 2
    });
    
    console.log('|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_||_||_| Rieko Log |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_||_|');
    console.log(' ____  _      _          ~|~ Rieko has connected to Discord!'); 
    console.log('|  _ \(_) ___| | _____   ~|~ Guilds: ' + bot.guilds.size);
    console.log('| |_) | |/ _ \ |/ / _ \  ~|~ Users: ' + bot.users.size);
    console.log('|  _ <| |  __/   < (_) | ~|~ Channels: ' + Object.keys(bot.channelGuildMap).length);
    console.log('|_| \_\_|\___|_|\_\___/  ~|~ Commands: ' + bot.commands.size);
    console.log('|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_||_||_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_||_||_|_|_|_|_|_|');
  });
};