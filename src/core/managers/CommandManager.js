const fs = require('fs');
const path = require('path');

class CommandManager {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this.path = `${__dirname}/../../bot/commands`
  }
  
  async load() {
    fs.readdir(this.path, (error, commands) => {
      if (error) throw error;
      for (let i = 0; i < commands.length; i++) {
        const Command = require(path.join(this.path, commands[i]));
        const command = new Command(this.client, this.db);
        this.client.commands.set(command.command, command);
      }
    });
  }
  
  get commands() {
    return this.client.commands;
  }
}
module.exports = CommandManager;