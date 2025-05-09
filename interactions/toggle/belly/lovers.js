// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const role = "1369476905954447420";

  if (interaction.member.roles.resolve(role)) {
    interaction.member.roles.remove(role);

    interaction.reply({
      content: 'You are no longer a belly lover.',
      flags: 64
    });
  } else {
    interaction.member.roles.add(role);

    interaction.reply({
      content: 'You are a belly lover. 🍐',
      flags: 64
    });
  }
}
