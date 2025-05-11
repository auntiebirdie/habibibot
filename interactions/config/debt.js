const JSONdb = require('simple-json-db');

module.exports = (interaction) => {
  const db = new JSONdb(`db/members/${interaction.user.id}.json`);
  const likesDebt = !(db.get('likesDebt') ?? false);

  db.set('likesDebt', likesDebt);

  return interaction.reply({
	  content: likesDebt ? 'You can now go into debt.' : 'You can no longer go into debt.',
    flags: 64
  });
}
