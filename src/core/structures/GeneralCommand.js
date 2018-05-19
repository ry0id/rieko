<<<<<<< HEAD
class GeneralCommand {
  constructor(options) {
    this.command = options.command;
    this.category = options.category;
    this.aliases = options.aliases;
    this.description = options.description;
    this.usage = options.usage;
    this.examples = options.examples;
    this.hidden = options.hidden;
  }
}

=======
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

>>>>>>> 900bae64de5b33996f01a427b6f870c75003e083
module.exports = GeneralCommand;