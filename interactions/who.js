module.exports = async function(interaction) {
  const member = await interaction.guild.members.fetch(interaction.options.getUser('member'));

  if (member.id == interaction.client.user.id) {
    interaction.reply({
      content: "That's *me*!",
      flags: 64
    });
  } else {
    interaction.deferReply({
      flags: 64
    });

    interaction.guild.channels.fetch('1348796283883753563').then(async (channel) => {
      let intro;
      let lastMessageId = null;
      let moreMessages = false;

      do {
        await new Promise((resolve, reject) => {
          channel.messages.fetch({
            limit: 100,
            before: lastMessageId
          }).then(async (messages) => {
            if (messages.size > 0) {
              intro = messages.find((message) => message.author.id == member.id && message.reactions.resolve('👋'));

              moreMessages = intro ? false : messages.size == 100;
              lastMessageId = messages.last().id

              resolve();
            } else {
              moreMessages = false;

              resolve()
            }
          })
        })
      } while (moreMessages);

      if (intro) {
        interaction.editReply({
          embeds: [{
            title: member.displayName,
            description: intro.content,
            thumbnail: {
              url: member.displayAvatarURL()
            }
          }],
          flags: 64
        });
      } else {
        interaction.editReply({
          content: "I can't find an intro for that member.",
          flags: 64
        });
      }
    });
  }
}
