// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const role = "1366382044153778196";

  if (interaction.member.roles.resolve(role)) {
    interaction.member.roles.remove(role);

    interaction.reply({
      content: 'You are no longer part of the Coffee Coven.',
      flags: 64
    });
  } else {
    interaction.member.roles.add(role);

    interaction.reply({
      content: 'You are part of the Coffee Coven. :sparkles:',
      flags: 64
    });
  }
}
