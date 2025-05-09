module.exports = async (interaction) => {
  if (interaction.member.roles.resolve('1354825555211718698') || interaction.roles.resolve('1349251067589693490')) {
    const targetMember = await interaction.guild.members.fetch(interaction.options.getUser('member'));
    const role = "1348788076071223386";

    if (targetMember.roles.resolve(role)) {
      targetMember.roles.remove(role);

      interaction.reply({
        content: `You have revoked <@${targetMember.id}>'s access to the shop.`,
        flags: 64
      });
    } else {
      interaction.reply({
        content: `<@${targetMember.id}> doesn't have access to the shop.`,
        flags: 64
      });
    }
  } else {
    interaction.reply({
      content: "You don't have permission to do that. You shouldn't even see this command! Please let kharti know that Discord is misbehaving.",
      flags: 64
    });
  }
}