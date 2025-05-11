const Chance = require('chance').Chance();
const JSONdb = require('simple-json-db');

const money = require('../../helpers/money.js');

module.exports = (interaction) => {
  return new Promise(async (resolve, reject) => {
            let member = interaction.member;

            if (!member) {
                    const guild = await interaction.client.guilds.fetch('1348782866355716177');
                    member = await guild.members.fetch(interaction.user.id);
            }

    const state = new JSONdb(`db/games/botsweeper/${interaction.user.id}.json`);

    const embeds = [];
    const numbers = ['<:zero:1147962945670758490>', '<:one:1143953251033698436>', '<:two:1143957925409337364>', '<:three:1143960626868269097>', '<:four:1143961071867154433>', '<:five:1143961868508090534>', '<:six:1143961879648145458>', '<:seven:1144082878653792377>', '<:eight:1144083599059058748>'];

    let components = state.get('components') || [];

    if (interaction.isMessageComponent()) {
      let clicked = interaction.customId * 1;

      if (components.filter((component) => !component.revealed && !component.escaped).length == 0) {
        components = [];
        lastClicked = null;

        state.set('lastClicked', null);

        for (let i = 0, len = 20; i < len; i++) {
          let component = {
            type: 2,
            style: 1,
            emoji: '<:blank:1146866415320703027>',
            revealed: false
          };

          if (i < 3) {
            component.bot = Chance.pickone(['<:habibi:1349791459846393907>', '<:joyhabibi:1349791487096914081>', '<:lovehabibi:1349791561445150740>', '<:pensivehabibi:1349791596992004106>', '<:tearhabibi:1349791526674501775>', '<:thinkhabibi:1349791646312562718>']);
          }

          components.push(component);
        }

        do {
          components = Chance.shuffle(components);
        } while (components[clicked].bot)

        for (let i = 0, len = 20; i < len; i++) {
          let row = Math.floor(i / 4);

          components[i].custom_id = `play/botsweeper_${i}`;

          if (!components[i].bot) {
            let adjacent = 0;

            let rowStart = row * 4;
            let rowEnd = rowStart + 3;

            if (row > 0) {
              if (i > rowStart && components[i - 5].bot) {
                adjacent++;
              }

              if (components[i - 4].bot) {
                adjacent++;
              }

              if (i < rowEnd && components[i - 3].bot) {
                adjacent++;
              }
            }

            if (i > rowStart && components[i - 1].bot) {
              adjacent++;
            }

            if (i < rowEnd && components[i + 1].bot) {
              adjacent++;
            }

            if (row < 4) {
              if (i > rowStart && components[i + 3].bot) {
                adjacent++;
              }

              if (components[i + 4].bot) {
                adjacent++;
              }

              if (i < rowEnd && components[i + 5].bot) {
                adjacent++;
              }
            }

            if (adjacent > 0) {
              components[i].number = numbers[adjacent];
            }
          }
        }
      }

      let component = components[clicked];

      if (!component.revealed && !component.escaped) {
        if (component.bot) {
          embeds.push({
            description: `Oh no! You spooked the botnik and it flew away.`,
          });

          component.escaped = true;
        } else if (component.number) {
          component.revealed = true;
        } else {
          let toCheck = [clicked];
          let checked = [];

          do {
            let check = toCheck.shift();

            checked.push(check);

            if (!components[check].bot) {
              let row = Math.floor(check / 4);
              let rowStart = row * 4;
              let rowEnd = rowStart + 3;

              components[check].revealed = true;

              if (row > 0 && !checked.includes(check - 4) && !(components[check].number && components[check - 4].number)) {
                toCheck.push(check - 4);
              }

              if (check > rowStart && !checked.includes(check - 1) && !(components[check].number && components[check - 1].number)) {
                toCheck.push(check - 1);
              }

              if (check < rowEnd && !checked.includes(check + 1) && !(components[check].number && components[check + 1].number)) {
                toCheck.push(check + 1);
              }

              if (row < 4 && !checked.includes(check + 4) && !(components[check].number && components[check + 4].number)) {
                toCheck.push(check + 4);
              }
            }
          } while (toCheck.length > 0);
        }
      }

        let remainingBots = [];
        let earnedCoins = 0;

        for (let i = 0, len = components.length; i < len; i++) {
          if (components[i].bot) {
            if (!components[i].revealed && !components[i].escaped) {
              let unrevealed = checkUnrevealed(components, i);

              if (unrevealed == 0) {
                embeds.push({
                  description: 'You successfully captured a botnik! You gain 10 coins!',
                  thumbnail: {
                    url: `https://cdn.discordapp.com/emojis/${components[i].bot.split(':').pop().replace(/[^0-9]/g, '')}.webp?size=96&quality=lossless`
                  }
                });

                earnedCoins += 10;
                components[i].revealed = true;
              } else {
                remainingBots.push(i);
              }
            }
          }
        }

        if (earnedCoins > 0) {
          money.addCoins(member, earnedCoins);
        }

        if (remainingBots.length == 0) {
          for (let i = 0, len = components.length; i < len; i++) {
            components[i].revealed = true;
          }
        }

        state.set('components', components);

        for (let component of components) {
          if (component.escaped) {
            component.emoji = '❌';
            component.disabled = true;
          } else if (component.revealed) {
            component.emoji = component.bot || component.number || '<:blank:1146866415320703027>';
            component.disabled = remainingBots.length == 0 || (!component.bot && !component.number);
          }
        }
    } else {
      components = Array.from({
        length: 20
      }, (_, i) => ({
        type: 2,
        style: 1,
        emoji: '<:blank:1146866415320703027>',
        custom_id: `play/botsweeper_${i}`
      }));
    }

    let rows = [];
    let rowTracker = 0;

    for (let i = 0, len = components.length; i < len; i++) {
      if (rowTracker % 4 == 0 || components[i].newRow) {
        rows.push({
          type: 1,
          components: []
        });
      }

      rows[rows.length - 1].components.push(components[i]);

      rowTracker = components[i].newRow ? 1 : ++rowTracker;
    }

    const message = {
      content: "Click or tap in the field to explore that spot and reveal how many botniks are adjacent to it. Surround the botnik without clicking it directly to catch it, or else it will get spooked and fly away.",
      components: rows,
      embeds,
      flags: 64
    };

    if (interaction.isMessageComponent()) {
      interaction.deferUpdate().catch(() => {}).finally(() => {
        interaction.webhook.editMessage('@original', message)
      });
    } else {
      interaction.reply(message);
    }
  }).catch((err) => {
    console.log(err);

    interaction.reply({
      content: "Something went wrong. Please ask kharti to check my logs!",
      flags: 64
    });
  });
}

function checkUnrevealed(components, i, exclude = []) {
  let row = Math.floor(i / 4);
  let rowStart = row * 4;
  let rowEnd = rowStart + 3;
  let toCheck = [];
  let unrevealed = 0;

  exclude.push(i);

  if (row > 0) {
    if (i > rowStart) {
      toCheck.push(i - 5);
    }

    toCheck.push(i - 4);

    if (i < rowEnd) {
      toCheck.push(i - 3);
    }
  }

  if (i > rowStart) {
    toCheck.push(i - 1);
  }

  if (i < rowEnd) {
    toCheck.push(i + 1);
  }

  if (row < 4) {
    if (i > rowStart) {
      toCheck.push(i + 3);
    }

    toCheck.push(i + 4);

    if (i < rowEnd) {
      toCheck.push(i + 5);
    }
  }

  for (let check of toCheck) {
    if (!exclude.includes(check)) {
      if (!components[check].revealed && !components[check].escaped) {
        if (components[check].number) {
          unrevealed++;
        } else if (unrevealed == 0) {
          let adjacentUnrevealed = checkUnrevealed(components, check, exclude);

          if (adjacentUnrevealed > 0) {
            unrevealed++;
          }
        }
      }
    }
  }

  return unrevealed;
}
