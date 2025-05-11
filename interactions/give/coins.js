const JSONdb = require('simple-json-db');
const money = require('../../helpers/money.js');

module.exports = async (interaction) => {
  const targetUser = interaction.options.getUser('member');

  if (targetUser.bot) {
    return interaction.reply({
      content: `<@${targetUser.id}> has no need of coins.`,
      flags: 64
    });
  } else {
    const toSend = interaction.options.getInteger('amount');

    if (toSend >= 0) {
      const fromCoins = money.fetchCoins(interaction.user.id);

      if (fromCoins >= toSend) {
        const targetMember = await interaction.guild.members.fetch(targetUser.id);

        money.removeCoins(interaction.member, toSend);
        money.addCoins(targetMember, toSend);

        return interaction.reply({
          content: `<@${interaction.user.id}> gives <@${targetUser.id}> ${toSend.toLocaleString()} coin${toSend == 1 ? '' : 's'}!`
        });
      } else {
        return interaction.reply({
          content: `You only have ${fromCoins.toLocaleString()} coins.`,
          flags: 64
        });
      }
    } else {
      return interaction.reply({
        content: 'Very funny.',
        flags: 64
      });
    }
  }
}
