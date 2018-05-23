const { Command } = require('../../core');
const util = require('util');
const uploadToHastebin = require('../../core/managers/uploadToHastebin');

class Eval extends Command {
  constructor(bot, db) {
    super({
      command: 'eval',
      category: 'Developer',
      aliases: [],
      description: 'Evaluates some js code within the bot.',
      usage: '{{ prefix }}eval <js code>',
      examples: [
        'eval this.bot.token'
      ],
      hidden: true,
      ownerOnly: true,
      nsfwOnly: false,
      cooldown: 30e3
    });
    this.bot = bot;
    this.db = db;
    this.i18n = require('i18n');
  }
  
  async load(msg, args) {
    const delarray = [];
    const cleanup = async () => {
      if (msg.channel.type === 0 && msg.channel.permissionsOf(this.bot.user.id).has('manageMessages')) {
        msg.channel.deleteMessages(delarray);
      }
    };
    let toEval;
    if (args.length === 0) {
      msg.channel.createMessage(':x: Type some code down here.')
      .then(m => delarray.push(m.id));
      const awaitEval = await this.bot.messageCollector.awaitMessage(msg.channel.id, msg.author.id, 60000);
      if (!awaitEval || awaitEval.content.toLowerCase() === 'cancel' || awaitEval.content.toLowerCase() === 'c') {
        return msg.channel.createMessage('<:ui_x:447144294415990789> Prompt timed out.')
      } else if (!awaitEval.cleanContent) {
        return msg.channel.createMessage('<:ui_x:447144294415990789> Only text works.');
      } 
      toEval = awaitEval.content;
    } else { toEval = args.join(' ') }
    try {
      let result = eval(toEval);
      result = util.inspect(result);
      result = result.replace(new RegExp('this.bot.token', 'g'), '+=+=+=+=BOT TOKEN+=+=+=+=');
      result = result.replace(new RegExp(process.env.TOKEN, 'g'), '+=+=+=+=BOT TOKEN+=+=+=+=');
      msg.addReaction(':ui_tick:447144175490826260');
      if (result.length > 1992) {
        uploadToHastebin(result).then((url) => {
          msg.channel.createMessage({ 
            embed: {
              title: 'The code has been evaled.',
              fields: [
                {
                  name: '<:ui_input:447128893128835073> Input',
                  value: `\`\`\`\n${toEval}\n\`\`\``
                },
                {
                  name: '<:ui_output:447129301179957248> Output',
                  value: `[Hastebin](${url})`
                }
              ],
              color: 0x34363C
            }
          });
        }).catch((err) => {
          msg.channel.createMessage(':exclamation: Failed to upload to Hastebin. `' + err.message +'`');
        });
      } else {
        msg.channel.createMessage({ 
            embed: {
              title: 'The code has been evaled.',
              fields: [
                {
                  name: '<:ui_input:447128893128835073> Input',
                  value: `\`\`\`\n${toEval}\n\`\`\``
                },
                {
                  name: '<:ui_output:447129301179957248> Output',
                  value: `\`\`\`\n${result}\n\`\`\``
                }
              ],
              color: 0x34363C
            }
        });
      }
    } catch (err) {
      msg.addReaction(':ui_x:447144294415990789');
      msg.channel.createMessage({ 
        embed: {
          title: 'ERROR',
          fields: [
            {
              name: '<:ui_input:447128893128835073> Input',
              value: `\`\`\`js\n${toEval}\n\`\`\``
            },
            {
              name: '<:ui_output:447129301179957248> Error',
              value: `\`\`\`js\n${err}\n\`\`\``
            }
          ],
          color: 0x34363C
        }
      });
    }
    cleanup();
  }
}

module.exports = Eval;