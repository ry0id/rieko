const { Client, Collection } = require('eris');
const rieko = require('rieko.js');
const i18n = require('i18n');
const CommandManager = require('./managers/CommandManager');
const EventManager = require('./managers/EventManager');
const ManipulationManager = require('./managers/ManipulationManager');
const messageCollector = require('./utils/messageCollector');
const reactionCollector = require('./utils/reactionCollector');                             
const WebhookClient = require('./utils/Webhook');

class RiekoClient extends Client {
  constructor(token, options = {}) {
    super(token, options);
    
    this.api = new rieko.Client();
    this.q = require('quick.db');
    this.db = require('./utils/dbFunctions')(this);
    this.snek = require('snekfetch');
    
    this.webhook = new WebhookClient(process.env.WEBHOOKID, process.env.WEBHOOKTOKEN);
    this.commands = new Collection();
    this.aliases = new Collection();
    
    this.messageCollector = new messageCollector(this);
    this.reactionCollector = new reactionCollector(this);
    this.commandManager = new CommandManager(this, this.db);
    this.eventManager = new EventManager(this, this.db);
    this.manipulationManager = ManipulationManager(this)
    
    i18n.configure({
      objectNotation: true,
      directory: `${__dirname}/../locales`,
      defaultLocale: 'en_UK',
      locales: ['en_UK'],
      autoReload: false
    });
    i18n.init(this);
  }
  
  load() {
    this.commandManager.load();
    this.eventManager.load();
    this.connect().then(() => {
      console.log('RIEKO: Loaded!');
    });
  }
  
  async reboot() {
    await process.exit().then(() => {
      this.load();
    });
  }
}
module.exports = RiekoClient;