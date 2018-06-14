module.exports = class ReactionCollector {
  constructor (bot) {
    this.collectors = {};
    
    bot.on('messageReactionAdd', this.verify.bind(this));
  }
  
  async verify (msg, emoji, userID) {
    const collector = this.collectors[msg.channel.id + msg.id + userID];
    if (collector && collector.filter(msg, emoji, userID)) {
      collector.resolve({
        msg: msg,
        emoji: emoji,
        userID: userID
      });
    }
  }
  
  awaitReaction (channelID, messageID, userID, timeout, filter = () => true) {
    return new Promise(resolve => {
      if (this.collectors[channelID + messageID + userID]) {
        delete this.collectors[channelID + messageID + userID];
      }
      
      this.collectors[channelID + messageID + userID] = { resolve, filter };
      setTimeout(resolve.bind(null, false), timeout);
    });
  }
};