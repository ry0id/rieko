const { Client, Collection } = require('eris');
const i18n = require('i18n');
const CommandManager = require('./managers/CommandManager');
const EventManager = require('./managers/EventManager');
const GlitchManager = require('./managers/GlitchManager');
const ManipulationManager = require('./managers/ManipulationManager');
const messageCollector = require('./utils/messageCollector');
const WebhookClient = require('./utils/Webhook');

class RiekoClient extends Client {
  constructor(token, options = {}) {
    super(token, options);
    
    this.q = require('quick.db');
    this.db = require('./utils/dbFunctions')(this);
    this.webhook = new WebhookClient(process.env.WEBHOOKTOKEN, process.env.WEBHOOKID);
    this.commands = new Collection();
    this.aliases = new Collection();
    
    this.messageCollector = new messageCollector(this);
    this.commandManager = new CommandManager(this, this.db);
    this.eventManager = new EventManager(this, this.db);
    this.glitchManager = new GlitchManager();
    this.manipulationManager = ManipulationManager(this)
    
    i18n.configure({
      objectNotation: true,
      directory: `${__dirname}/../locales`,
      defaultLocale: 'en_UK',
      locales: ['en_UK'],
      autoReload: false
    });
  }
  
  load() {
    this.commandManager.load();
    this.eventManager.load();
    this.glitchManager.load();
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