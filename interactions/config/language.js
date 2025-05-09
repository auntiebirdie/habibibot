const JSONdb = require('simple-json-db');

module.exports = (interaction) => {
  const db = new JSONdb(`db/members/${interaction.user.id}.json`);

  const languageChoices = {
    en: "Your language has been set to English.",
    es: "Su idioma ha sido establecido en español.",
    ru: "Ваш язык установлен на русский.",
    de: "Ihre Sprache wurde auf Deutsch eingestellt."
  };

  const language = interaction.options.getString('language');

  db.set('language', language);

  return interaction.reply({
    content: languageChoices[language] || `Your language has been set you ${language}.`,
    flags: 64
  });
}