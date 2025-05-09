const JSONdb = require('simple-json-db');

const translateMessage = require('../helpers/translateMessage.js');

module.exports = async (interaction) => {
  await interaction.deferReply({
    flags: 64
  });

  try {
    const db = new JSONdb(`db/members/${interaction.user.id}.json`);
    const language = db.get('language') || 'en';

      let translation = await translateMessage(interaction.targetMessage, language);
      interaction.editReply({
        content: `<@${interaction.targetMessage.author.id}>: ${translation}`,
        flags: 64
      });
  } catch (err) {
    console.error(err);

    interaction.editReply({
      content: 'Something went wrong translating this content. Please let kharti know!',
      flags: 64
    });
  }
}
