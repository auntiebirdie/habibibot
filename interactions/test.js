const Chance = require('chance').Chance();

module.exports = function(interaction) {
  // if this is a slash command input, prompt with modal
  if (interaction.isChatInputCommand()) {
    interaction.showModal({
      custom_id: `whisper^${Date.now()}`, // add date.now to make ID unique so it doesn't auto-populate
      title: 'What do you want to say?',
      components: [{
        type: 1, // 1 = row
        components: [{
          type: 4, // 4 = text input
          style: 2, // 2 = paragraph ttext
          custom_id: 'message', // used to reference this later to fetch the value
          label: 'Message'
        }]
      }]
    });
    // else if this is a modal submit, send the message
  } else if (interaction.isModalSubmit()) {
    const message = interaction.fields.getTextInputValue('message');
    const avatar = Chance.pickone([
      "https://storage.googleapis.com/habibibot/Amy%20Rose.png",
      "https://storage.googleapis.com/habibibot/Big%20the%20Cat.png",
      "https://storage.googleapis.com/habibibot/Blaze%20the%20Cat.png",
      "https://storage.googleapis.com/habibibot/Charmy%20Bee.png",
      "https://storage.googleapis.com/habibibot/Cheese%20the%20Chao.png",
      "https://storage.googleapis.com/habibibot/Cream%20the%20Rabbit.png",
      "https://storage.googleapis.com/habibibot/Espio%20the%20Chameleon.png",
      "https://storage.googleapis.com/habibibot/Jet%20the%20Hawk.png",
      "https://storage.googleapis.com/habibibot/Knuckles%20the%20Echidna.png",
      "https://storage.googleapis.com/habibibot/Metal%20Sonic.png",
      "https://storage.googleapis.com/habibibot/Miles%20Tails%20Prower.png",
      "https://storage.googleapis.com/habibibot/Rouge%20the%20Bat.png",
      "https://storage.googleapis.com/habibibot/Shadow%20the%20Hedgehog.png",
      "https://storage.googleapis.com/habibibot/Silver%20the%20Hedgehog.png",
      "https://storage.googleapis.com/habibibot/Sonic%20the%20Hedgehog.png",
      "https://storage.googleapis.com/habibibot/Storm%20the%20Albatross.png",
      "https://storage.googleapis.com/habibibot/Vector%20the%20Crocodile.png",
      "https://storage.googleapis.com/habibibot/Wave%20the%20Swallow.png",
      "https://storage.googleapis.com/habibibot/eggman1.png",
      "https://storage.googleapis.com/habibibot/stone1.png",
      "https://storage.googleapis.com/habibibot/stone2.png",
      "https://storage.googleapis.com/habibibot/stone3.png",
      "https://storage.googleapis.com/habibibot/robotnik1.png"
    ]);


    const channel = interaction.channel.isThread() ? interaction.channel.parent : interaction.channel;

    channel.createWebhook({
      name: 'Lurker',
      avatar
    }).then((webhook) => {
      webhook.send({
        content: message,
        threadId: interaction.channel.isThread() ? interaction.channel.id : null
      }).then(() => {
        webhook.delete();
      });

      interaction.reply({
        content: ":thumbsup:",
        flags: 64
      });

      // log messages in case of abuse/problems
      interaction.guild.channels.fetch("1363529129173061642").then((channel) => {
        channel.send({
          embeds: [{
            description: `<@${interaction.user.id}> said in <#${interaction.channel.id}>: \r\n\r\n ${message}`
          }]
        });
      });
    }).catch((err) => {
      console.error(err);
      interaction.reply({
        content: "Something went wrong. <:sobhabibi:1351611525672206366>",
        flags: 64
      });
    });
    // this shouldn't happen
  } else {
    interaction.reply({
      content: "Something went wrong. <:sobhabibi:1351611525672206366>",
      flags: 64
    });
  }
}
