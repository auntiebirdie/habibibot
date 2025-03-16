module.exports = async function(interaction) {
  const member = interaction.options.getUser('member');

  if (member.id == interaction.client.user.id) {
    interaction.reply({
      content: "That's *me*!",
      flags: 64
    });
  } else {
    interaction.guild.channels.fetch('1348796283883753563').then((channel) => {
      channel.messages.fetch().then((messages) => {
        var intro = messages.find((message) => message.author.id == member.id && message.reactions.resolve('👋'));

        interaction.reply({
          embeds: [{
            description: intro ? `<@${member.id}>\r\n\r\n${intro.content}` : "I can't find an intro for that member."
          }],
          flags: 64
        });
      });
    });
  }
}