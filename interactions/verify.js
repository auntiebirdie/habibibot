module.exports = async (interaction) => {
  const targetMember = await interaction.guild.members.fetch(interaction.options.getUser('member'));
  const role = "1348788076071223386";

  if (targetMember.roles.resolve(role)) {
    targetMember.roles.remove(role);

    interaction.reply({
      content: `You have revoked <@${targetMember.id}>'s access to the shop .`,
      flags: 64
    });
  } else {
    targetMember.roles.add(role);

    interaction.reply({
      content: `You have granted <@${targetMember.id}> access to the shop.`,
      flags: 64
    });
  }
}
