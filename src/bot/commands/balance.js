const { Command, resolveUser } = require('../../core');

class Balance extends Command {
  constructor(bot, db) {
    super({
      command: 'balance',
      category: 'Profile',
      aliases: [
        'bal'
      ],
      description: 'Views a person\'s balance.',
      usage: '{{ prefix }}balance [user mention]',
      examples: [
        '{{ prefix }}balance',
        '{{ prefix }}balance @murf#4142',
        '{{ prefix }}balance @void#0001'
      ],
      hidden: false,
      ownerOnly: false,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
    this.user = new resolveUser(this.bot, this.db);
  }
  
  load(msg, args) { 
    this.user.resolve(args.length > 0 ? args.join(' ') : msg.author.id).then(async(user) => {
      let profile = await this.db.getUser(user.id);
      if (!profile || profile === null) {
        this.db.initUser(user.id);
      }
      this.bot.manipulationManager.balance(msg, user, profile.balance, msg.channel.id);
    }).catch(() => {
      msg.channel.createMessage(msg.__('commands.unknownUser'));
    });
  }
}

module.exports = Balance;
