const Chance = require('chance').Chance();
const JSONdb = require('simple-json-db');

const money = require('../../helpers/money.js');

module.exports = async (interaction) => {
  try {
    if (interaction.channel.id == '1370898529152794624' || interaction.channel.type == 1) {
	    let member = interaction.member;

	    if (!member) {
		    const guild = await interaction.client.guilds.fetch('1348782866355716177');
		    member = await guild.members.fetch(interaction.user.id);
	    }

      const result = money.removeCoins(member, 10);

      if (!result.error) {
        if (Chance.bool({
            likelihood: 60
          })) {
          interaction.reply({
            content: Chance.pickone([
              "You move the claw over your desired target... it lowers... it catches on the corner... it starts to lift back up... and the prize slips out of the metal grasp.",
              "You carefully position the claw, press the button, and watch as it descends... it grabs the prize for a moment, but it wobbles and falls back into the pile.",
              "The claw lowers with precision, clamps onto the prize, and begins to rise... but the prize tumbles out just before it reaches the chute.",
              "You guide the claw expertly, it grabs the prize, and for a moment, victory seems certain... until the prize slips free and lands back in the heap.",
              "The claw descends, grips the prize, and starts to lift... but the prize wiggles loose and drops back into the pile with a soft thud.",
              "You align the claw perfectly, press the button, and watch as it grabs the prize... only for it to slip out of the claw's grasp at the last second.",
              "The claw lowers, clamps onto the prize, and begins to rise... but the prize teeters and falls back into the pile.",
              "You maneuver the claw with precision, it grabs the prize, and starts to lift... but the prize slips free and lands back in the pile.",
              "The claw descends, grips the prize tightly, and starts to lift... but the prize shakes loose and drops back into the pile.",
              "You position the claw perfectly, it grabs the prize, and begins to lift... but the prize slips out and falls back into the pile."
            ]) + ' ' + result.message
          });
        } else {
          delete require.cache[require.resolve('../../data/prizes.json')];

          const prizes = require('../../data/prizes.json');
          const prize = Chance.pickone(prizes);

          interaction.reply({
            content: Chance.pickone([
              "You carefully position the claw, press the button, and watch as it descends... it grabs the prize firmly, lifts it up, and drops it into the chute!",
              "The claw lowers with precision, clamps onto the prize, and begins to rise... it holds steady and delivers the prize to the chute!",
              "You guide the claw expertly, it grabs the prize... it stays in the claw and drops into the prize bin!",
              "The claw descends, grips the prize tightly, and starts to lift... it holds on all the way to the chute!",
              "You align the claw perfectly, press the button, and watch as it grabs the prize... it holds firm and delivers it to the prize bin!",
              "The claw lowers, clamps onto the prize, and begins to rise... it doesn’t let go this time, and the prize lands safely in the chute!",
              "You maneuver the claw with precision, it grabs the prize, and starts to lift... it holds steady and drops the prize into the prize bin!",
              "The claw descends, grips the prize tightly, and starts to lift... this time, it doesn’t falter, and the prize lands in the chute with a satisfying clunk!",
              "You position the claw perfectly, it grabs the prize, and begins to lift... it holds on tight and delivers the prize to the prize bin!",
              "The claw lowers, grips the prize, and starts to rise... it stays steady all the way to the chute!"
            ]) + ' ' + result.message,
            embeds: [{
              title: prize.name,
              url: prize.source,
              image: {
                url: prize.image
              },
              footer: {
                text: prize.source.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\s]+)/)[0]
              }
            }]
          });
        }
      } else {
        interaction.reply({
          content: `You only have ${money.fetchCoins(interaction.user.id).toLocaleString()} coins; it costs 10 to play... you can earn more by playing other games!`,
          flags: 64
        });
      }
    } else {
      interaction.reply({
        content: 'Please play this game in <#1370898529152794624> or in DMs.',
        flags: 64
      });
    }
  } catch (err) {
    console.error(err);

    interaction.reply({
      content: 'Something went wrong.',
      flags: 64
    });
  }
}
