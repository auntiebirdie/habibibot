// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const role = "1369476525862424596";

  if (interaction.member.roles.resolve(role)) {
    interaction.member.roles.remove(role);

    interaction.reply({
      content: 'You are no longer an attention slut.',
      flags: 64
    });
  } else {
    interaction.member.roles.add(role);

    interaction.reply({
      content: 'You are an attention slut. 🫦',
      flags: 64
    });
  }
}
