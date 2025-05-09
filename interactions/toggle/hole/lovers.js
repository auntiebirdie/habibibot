// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const role = "1364684142637351153";

  if (interaction.member.roles.resolve(role)) {
    interaction.member.roles.remove(role);

    interaction.reply({
      content: 'You are no longer a hole lover. <:nohole:1365328683203825725>',
      flags: 64
    });
  } else {
    interaction.member.roles.add(role);

    interaction.reply({
      content: 'You are a hole lover. :hole:',
      flags: 64
    });
  }
}
