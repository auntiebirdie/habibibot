// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const role = "1370207289016979488";

  if (interaction.member.roles.resolve(role)) {
    interaction.member.roles.remove(role);

    interaction.reply({
      content: 'You are no longer a yuri lover.',
      flags: 64
    });
  } else {
    interaction.member.roles.add(role);

    interaction.reply({
      content: 'You are a yuri lover. ♀️',
      flags: 64
    });
  }
}
