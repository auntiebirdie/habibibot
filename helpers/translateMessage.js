const JSONdb = require('simple-json-db');

const {
  Translate
} = require('@google-cloud/translate').v2;

const translate = new Translate();

module.exports = async (message, language = 'en') => {
  const db = new JSONdb(`db/translations/${message.id}.json`);

  if (db.get(language)) {
    return db.get(language);
  } else {
    const [translation] = await translate.translate(message.content, {
      to: language,
      model: 'nmt' // neural machine translation model, NOT ai-powered llm
    });

    db.set(language, translation);

    return translation;
  }
}
