const { Command } = require('../../core');
const { exec } = require('child_process');
const uploadToHastebin = require('../../core/managers/uploadToHastebin');

class Exec extends Command {
  constructor(bot, db) {
    super({
      command: 'exec',
      category: 'Developer',
      aliases: [
        'zsh'
      ],
      description: 'Bot owner only.',
      usage: '{{ prefix }}exec <console code>',
      examples: [
        '{{ prefix }}exec npm i'
      ],
      hidden: true,
      ownerOnly: true,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
  }
  
  async load(msg, args) { 
    const delarray = [];
    const cleanup = async () => {
      if (msg.channel.type === 0 && msg.channel.permissionsOf(this.bot.user.id).has('manageMessages')) {
        msg.channel.deleteMessages(delarray);
      }
    };
    let toExec;
    if (args.length === 0) {
      msg.channel.createMessage(':x: Type some code down here.')
      .then(m => delarray.push(m.id));
      const awaitExec = await this.bot.messageCollector.awaitMessage(msg.channel.id, msg.author.id, 60000);
      if (!awaitExec || awaitExec.content.toLowerCase() === 'cancel' || awaitExec.content.toLowerCase() === 'c') {
        return msg.channel.createMessage('<:ui_x:447144294415990789> Prompt timed out.')
      } else if (!awaitExec.cleanContent) {
        return msg.channel.createMessage('<:ui_x:447144294415990789> Only text works.');
      } 
      toExec = awaitExec.content;
    } else { toExec = args.join(' ') }
    exec(toExec, async (e, stdout, stderr) => {
      if (stdout.length + stderr.length > 2000) {
        uploadToHastebin(`${stdout}\n\n${stderr}`).then((url) => {
          msg.channel.createMessage({
            embed: {
              description: `The log exceed 2000 characters. See [here](${url})`,
              color: 0x34363C
            }
          });
        });
      } else {
        if (!stdout && !stderr) {
          msg.addReaction(':ui_tick:447144175490826260');
        } else {
          msg.channel.createMessage(`${stdout ? `Info: \`\`\`\n${stdout}\n\`\`\`` : ''}\n${stderr ? `Error: \`\`\`\n${stderr}\n\`\`\`` : ''}`);
        }        
      }
    });
  }
}

module.exports = Exec;