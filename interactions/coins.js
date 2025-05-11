const money = require('../helpers/money.js');

module.exports = (interaction) => {
  const coins = money.fetchCoins(interaction.member.id);

  return interaction.reply({
    content: `You have ${coins.toLocaleString()} coins.`,
    flags: 64
  });
}
