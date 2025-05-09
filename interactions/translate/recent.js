const JSONdb = require('simple-json-db');

const translateMessage = require('../../helpers/translateMessage.js');

module.exports = async (interaction) => {
  await interaction.deferReply({
    flags: 64
  });

  try {
    const db = new JSONdb(`db/members/${interaction.user.id}.json`);
    const language = db.get('language');

    const messages = await interaction.channel.messages.fetch({
      limit: 10
    });
    const messagesArray = Array.from(messages.values()).reverse();
    const translatedMessages = [];

    for (let message of messagesArray) {
      let translation = await translateMessage(message, language);

      translatedMessages.push(`<@${message.author.id}>: ${translation}`);
    }

    const chunks = [];
    let currentChunk = '';

    for (let line of translatedMessages) {
      if ((currentChunk + line + '\r\n\r\n').length > 3000) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      currentChunk += line + '\r\n\r\n';
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }


    await interaction.editReply({
      content: chunks[0],
      flags: 64
    });


    for (let i = 1; i < chunks.length; i++) {
      await interaction.followUp({
        content: chunks[i],
        flags: 64
      });
    }
  } catch (err) {
    console.error(err);

    interaction.editReply({
      content: 'Something went wrong translating this content. Please let kharti know!',
      flags: 64
    });
  }
}
