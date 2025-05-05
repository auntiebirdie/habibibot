const Chance = require('chance').Chance();
const JSONdb = require('simple-json-db');

module.exports = function(interaction) {
  if (interaction.channel.id != "1348788301586366464") {
    return interaction.reply({
      content: 'Please keep icebreakers to the <#1348788301586366464> channel.',
      flags: 64
    });
  }

  const db = new JSONdb('db/icebreaker.json')

  if ((db.get('lastTimestamp') * 1) > Date.now() - (5 * 60 * 1000)) {
    return interaction.reply({
      content: 'Please wait 5 minutes before sending a new icebreaker.',
      flags: 64
    });
  }

  const icebreakers = [
    "What's your favorite color?",
    "Do you like coffee? If so, how do you like it? If not, what do you drink instead?",
    "What's your favorite moment in the Sonic movies?",
    "Do you have any pets?",
    "What's your favorite band?",
    "What's your favorite book?",
    "What game are you currently playing?",
    "What are your creative inspirations?",
    "What is a belief you hold close to your heart?",
    "In what ways do you like to spread positivity to others?",
    "What is your guilty pleasure food/snack?",
    "If you could learn and master one thing by the end of your life, what would it be?",
	  "What's your favorite animal?",
	  "What's your favorite AU (Stobotnik or otherwise)?",
	  "Do you have any fun Stobotnik headcanons you want to share?"
  ].filter((icebreaker) => icebreaker != db.get('lastIcebreaker'));
  const icebreaker = Chance.pickone(icebreakers);

  db.set('lastTimestamp', Date.now());
  db.set('lastIcebreaker', icebreaker);

  interaction.reply({
    content: 'Don\'t be shy! :heart:',
    flags: 64
  });

  interaction.channel.send({
    content: `Icebreaker time! If you're looking for an opportunity to engage but you're too shy to start a conversation, now's your chance!\r\n\r\n${icebreaker}`
  });
}
