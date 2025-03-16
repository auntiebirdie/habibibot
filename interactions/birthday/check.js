const JSONdb = require('simple-json-db')

module.exports = (interaction) => {
  const targetUser = interaction.options.getUser('member')
	const db = new JSONdb(`db/members/${targetUser.id}.json`);
  const birthdayData = db.get('birthday')

  if (birthdayData) {
    const birthday = new Date()
    birthday.setMonth(birthdayData.month)
    birthday.setDate(birthdayData.day)

    return interaction.reply({
      content: `<@${targetUser.id}>'s birthday is ${birthday.toLocaleString('default', { month: 'long', day: 'numeric' })}.`,
      flags: 64
    })
  } else {
    return interaction.reply({
      content: `<@${targetUser.id}> hasn't set their birthday yet.`,
      flags: 64
    })
  }
}
