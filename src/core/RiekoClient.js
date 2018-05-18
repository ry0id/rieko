const { Client, Collection } = require('eris');
const i18n = require('i18n');
const CommandManager = require('./managers/CommandManager');
const EventManager = require('./managers/EventManager');
const GlitchManager = require('./managers/GlitchManager');

class RiekoClient extends Client {
  constructor(token, options = {}) {
    super(token, options);
    
    this.db = require('quick.db');
    this.commands = new Collection();
    this.aliases = new Collection();
    this.commandManager = new CommandManager(this, this.db);
    this.eventManager = new EventManager(this, this.db);
    this.glitchManager = new GlitchManager();
    
    i18n.configure({
      objectNotation: true,
      directory: `${__dirname}/../locales`,
      defaultLocale: 'en_UK',
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
}
module.exports = RiekoClient;