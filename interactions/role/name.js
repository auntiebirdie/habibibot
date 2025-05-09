// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const existingRole = interaction.member.roles.cache.find((role) => role.permissions.toArray().length == 0);

  // If this interaction is a slash command...
  if (interaction.isMessageComponent()) {
    // "Replies" to the interaction with a modal.
    interaction.showModal({
      custom_id: 'role/name',
      title: 'Role Name',
      components: [{
        type: 1, // 1 = row
        components: [{
          type: 4, // 4 = text input
          style: 1, // 1 = short text
          custom_id: 'name', // Used to reference this later to fetch the value.
          label: 'What do you want your role name to be?',
          value: existingRole ? existingRole.name : null
        }]
      }]
    });
    // If this interaction is a modal submit...
  } else if (interaction.isModalSubmit()) {
    // Retrieves the submitted value for the name field.
    const roleName = interaction.fields.getTextInputValue('name');
    const roleColor = existingRole ? existingRole.color.toString(16) : null;

    if (existingRole) {
      existingRole.setName(roleName).then(() => {
        interaction.reply({
          content: 'Your custom role has been updated!',
          flags: 64
        });
      }).catch((err) => {
        console.error(err);
        interaction.reply({
          content: 'Something went wrong updating your custom role color.',
          flags: 64
        });
      });
    } else {
      // Creates the new custom role.
      interaction.guild.roles.create({
        name: roleName,
        hoist: true, // Displays roles separately on the member list.
        position: 8,
        permissions: []
      }).then((role) => {
        // Adds the role to the user.
        interaction.member.roles.add(role).then(() => {
          interaction.reply({
            content: 'Your custom role has been created!',
            flags: 64
          });
        });
      }).catch((err) => {
        console.error(err);
        interaction.reply({
          content: 'Something went wrong creating your custom role.',
          flags: 64
        });
      });
    }
  }
}
