class GeneralCommand {
  constructor(options) {
    this.command = options.command;
    this.category = options.category;
    this.aliases = options.aliases;
    this.description = options.description;
    this.usage = options.usage;
    this.examples = options.examples;
    this.hidden = options.hidden;
    this.ownerOnly = options.ownerOnly;
    this.nsfwOnly = options.nsfwOnly;
  }
}

module.exports = GeneralCommand;