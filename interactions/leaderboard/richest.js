const fs = require('fs');
const path = require('path');
const money = require('../../helpers/money.js');

module.exports = (interaction) => {
  const directoryPath = path.resolve(__dirname, '../../db/members');
  const filePattern = /^([0-9]+)\.json$/;

  try {
    const files = fs.readdirSync(directoryPath);
    const members = files
      .filter(file => filePattern.test(file))
      .map(file => {
        const match = file.match(filePattern);
        return match[1];
      });

    const leaderboard = [];

    for (let member of members) {
      let coins = money.fetchCoins(member);

      if (coins > 0) {
        leaderboard.push({
          member,
          coins
        });
      }
    }

    leaderboard.sort((a, b) => {
      return b.coins - a.coins;
    });


    const topLeaders = leaderboard.slice(0, 5);

    interaction.reply({
      embeds: [{
        title: 'Richest Members',
        description: topLeaders.map((data) => {
          return `<@${data.member}>   ${data.coins.toLocaleString()}`
        }).join('\r\n\r\n')
      }]
    });
  } catch (error) {
    console.error(error);

    interaction.reply({
      content: 'Something went wrong.',
      flags: 64
    });
  }
}
