const JSONdb = require('simple-json-db')

module.exports = {
  fetchCoins(memberId) {
    const db = new JSONdb(`db/members/${memberId}.json`);

    return db.get('coins') ?? 100;
  },
  addCoins(member, amount) {
    const db = new JSONdb(`db/members/${member.id}.json`);

    const newCoins = this.fetchCoins(member.id) + amount;

    db.set('coins', newCoins);

    if (newCoins >= 0 && member.roles.resolve('1370915277549735978')) {
      member.roles.remove('1370915277549735978');
    }

    return `You gain ${amount.toLocaleString()} coin${amount == 1 ? '' : 's'}!`;
  },
  removeCoins(member, amount) {
    const db = new JSONdb(`db/members/${member.id}.json`);

    const currentCoins = this.fetchCoins(member.id);

    if (currentCoins >= amount || db.get('likesDebt')) {
      const newCoins = currentCoins - amount;

      db.set('coins', newCoins);

      if (newCoins < 0 && !member.roles.resolve('1370915277549735978')) {
        member.roles.add('1370915277549735978');
      }

      return {
        message: `You now have ${newCoins.toLocaleString()} coin${newCoins == 1 ? '' : 's'}.`
      };
    } else {
      return {
        error: true,
        message: `You only have ${currentCoins.toLocaleString()} coin${currentCoins == 1 ? '' : 's'}.`
      };
    }
  }
}
