const JSONdb = require('simple-json-db');

module.exports = (interaction) => {
  const db = new JSONdb(`db/members/${interaction.user.id}.json`);

  const inputMonth = interaction.options.getInteger('month');
  const inputDay = interaction.options.getInteger('day');

  db.set('birthday', {
    month: inputMonth,
    day: inputDay
  });

  const birthday = new Date();
  birthday.setMonth(inputMonth);
  birthday.setDate(inputDay);

  return interaction.reply({
    content: `Your birthday has been set to ${birthday.toLocaleString('default', { month: 'long', day: 'numeric' })}.`,
    flags: 64
  });
}
