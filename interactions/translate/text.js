const {
  Translate
} = require('@google-cloud/translate').v2;

const translate = new Translate();

module.exports = async (interaction) => {
  await interaction.deferReply({
    flags: 64
  });

  try {
    const message = interaction.options.getString('message');
    const language = interaction.options.getString('language');

    const [translation] = await translate.translate(message, {
      to: language,
      model: 'nmt' //neural machine translation model, NOT ai-powered llm
    });

    interaction.editReply({
      content: translation,
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