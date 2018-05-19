class ResolveUser {
  constructor(client) {
    this.client = client;
  }
  
  resolve(query) {
    return new Promise((resolve, reject) => {
        if (/^\d+$/.test(query)) {
            const user = this.client.users.get(query);
            if (user) return resolve(user);
        } else if (/^<@!?(\d+)>$/.test(query)) {
            const match = query.match(/^<@!?(\d+)>$/);
            const user = this.client.users.get(match[1]);
            if (user) return resolve(user);
        } else if (/^(.+)#(\d{4})$/.test(query)) {
            const match = query.match(/^(.+)#(\d{4})$/);
            const users = this.client.users.filter((user) => user.username === match[1] && Number(user.discriminator) === Number(match[2]));
            if (users.length > 0) return resolve(users[0]);
        } else {
            const users = this.client.users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
            if (users.length > 0) return resolve(users[0]);
        }
        reject();
    });
  }
}

module.exports = ResolveUser;