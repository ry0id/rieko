const fs = require('fs');
const path = require('path');

class EventManager {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this.path = `${__dirname}/../../bot/events`
  }
  
  async load() {
    fs.readdir(this.path, (error, events) => {
      if (error) throw error;
      for (let i = 0; i < events.length; i++) {
        const event = require(path.join(this.path, events[i]));
	   event(this.client, this.db);
	}
    });
  }
}

module.exports = EventManager;
