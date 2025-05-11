const Chance = require('chance').Chance();
const JSONdb = require('simple-json-db');

const money = require('../../helpers/money.js');

module.exports = (interaction) => {
  try {
            let member = interaction.member;

            if (!member) {
                    const guild = await interaction.client.guilds.fetch('1348782866355716177');
                    member = await guild.members.fetch(interaction.user.id);
            }

    const state = new JSONdb(`db/games/memory/${interaction.user.id}.json`);

    let components = state.get('components') || [];
    let embeds = [];
    let lastClicked = state.get('lastClicked') ?? null;
	  let content = "Click or tap a square to reveal what's hiding underneath!";

    if (components.filter((component) => !component.matched).length == 0) {
      const emoji = Chance.shuffle(['<habibi:1349791459846393907>', '<stobkiss:1371117077137461338>', '<bug_under_rock:1371117021714186310>', '<huevodiablo:1371186834092195860>', '🥚', '🪨', '❤️', '🖤', '🤍', '💜', '☕', '🤖', '🗿', '🌹']);
      components = [];

      for (let i = 0, len = 10; i < len; i++) {
        let component = {
          type: 2,
          style: 2,
          emoji: '<:blank:1146866415320703027>',
          revealed: false,
          matched: false,
          item: emoji[i]
        };

        components.push({
          ...component
        }, {
          ...component
        })
      }

      components = Chance.shuffle(components)

      for (let i = 0, len = components.length; i < len; i++) {
        components[i].custom_id = `play/memory_${i}`
      }
    } else if (components.filter((component) => !component.revealed).length == 0) {
      content = 'Yay! You found all the matches! Click or tap any square to start a new round.";
    }

    if (interaction.isMessageComponent()) {
      let clicked = interaction.customId * 1;
      let component = components[clicked];

      if ((!component.revealed || component.style == 4) && !component.matched) {
        if (lastClicked != null) {
          let previousClicked = components.find((component) => component.style == 1);

          if (previousClicked.item == component.item) {
            previousClicked.matched = true;
            previousClicked.style = 3;
            component.style = 3;
            component.matched = true;

            money.addCoins(member, 1);

            content = "You found a match! You gain 1 coin.";
          } else {
            previousClicked.style = 4
            component.style = 4
            component.revealed = true

		  content = "*Bzzt!* That wasn't a match... click or tap a square to try again.";
          }

          state.set('lastClicked', null)
        } else {
          components = components.map((component) => {
            if (!component.matched) {
              component.revealed = false;
              component.style = 2;
            }

            return component;
          });

          component.style = 1;
          component.revealed = true;

          state.set('lastClicked', clicked);
        }
      }

      state.set('components', components)
    }

    for (let i = 0, len = components.length; i < len; i++) {
      if (components[i].revealed || components[i].matched) {
        components[i].emoji = components[i].item
      } else if (!components[i].revealed) {
        components[i].style = 2
      }
    }

    let rows = [{
      type: 1,
      components: []
    }];

    for (let i = 0, len = components.length; i < len; i++) {
      if (rows[rows.length - 1].components.length == 5) {
        rows.push({
          type: 1,
          components: []
        });
      }

      rows[rows.length - 1].components.push(components[i]);
    }

    const message = {
	    content,
      components: rows,
      flags: 64
    };

    if (interaction.isMessageComponent()) {
      interaction.deferUpdate().catch(() => {}).finally(() => {
        interaction.webhook.editMessage('@original', message)
      });
    } else {
      interaction.reply(message);
    }
  } catch (err) {
    console.error(err);

    interaction.reply({
      content: 'Something went wrong.',
      flags: 64
    });
  }
}
