// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const role = "1348788076071223386";

  if (interaction.member.roles.resolve(role)) {
    interaction.member.roles.remove(role);

    interaction.reply({
      content: 'You have revoked your consent to enter the shop.',
      flags: 64
    });
  } else {
    interaction.member.roles.add(role);

    interaction.reply({
      content: 'Your consent to enter the shop has been acknowledged. Remember to still mark explicit images with spoiler tags.',
      flags: 64
    });
  }
}
