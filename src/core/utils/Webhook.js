class WebhookClient {
  constructor(token, id) {
    this.token = token;
    this.id = id;
    this.snek = require("snekfetch");
  }

  async send(args) {
    this.snek.post(`https://discordapp.com/api/webhooks/${this.id}/${this.token}?wait=true`).send({
      embeds: [
        args
      ]
    }).end();
  }
}

module.exports = WebhookClient;