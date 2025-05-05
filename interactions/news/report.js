module.exports = function(interaction) {
  // if this is a slash command input, prompt with modal
  if (interaction.isChatInputCommand()) {
    interaction.showModal({
      custom_id: `news/report^${Date.now()}`, // add date.now to make ID unique so it doesn't auto-populate
      title: 'Send Report to the News Room',
      components: [{
        type: 1, // 1 = row
        components: [{
          type: 4, // 4 = text input
          style: 2, // 2 = paragraph ttext
          custom_id: 'message', // used to reference this later to fetch the value
          label: 'What\'s the scoop?',
          max_length: 2000
        }]
      }]
    });
    // else if this is a modal submit, send the message
  } else if (interaction.isModalSubmit()) {
    const message = interaction.fields.getTextInputValue('message');

    interaction.client.fetchWebhook('1365091847734825051', 'P-idbXxoz6XOvzQwlNb4iRNRlweWBqpN3RFe7uoXTPnLUPrJjnYDScEaBeoWM_Xg2xQM').then((webhook) => {
      webhook.send({
        content: message,
        threadId: '1365093700325085184'
      });

      interaction.deferUpdate();

      // log messages in case of abuse/problems
      interaction.guild.channels.fetch("1363529129173061642").then((channel) => {
        channel.send({
          embeds: [{
            description: `<@${interaction.user.id}> reported news: \r\n\r\n ${message}`
          }]
        });
      });
    }).catch((err) => {
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