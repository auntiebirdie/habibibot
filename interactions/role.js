// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  const {
    colornames
  } = await import('color-name-list');

  const existingRole = interaction.member.roles.cache.find((role) => role.permissions.toArray().length == 0);

  if (interaction.isChatInputCommand()) {
    if (existingRole) {
      interaction.reply({
        content: `You currently have the role ${existingRole.name}.`,
        components: [{
          type: 1,
          components: [{
            type: 2,
            style: 1,
            label: 'Change Name',
            custom_id: 'role/name'
          }, {
            type: 2,
            style: 1,
            label: 'Change Color',
            custom_id: 'role/color'
          }]
        }],
        flags: 64
      });
    } else {
      interaction.reply({
        content: 'To make your own custom role, you pick a name and a color. The name can be whatever you want, whether it\'s something simple like "Stobotnik Lover" or a silly inside joke. The color can be a hex code, or any known color name found on [this exhaustive list of color names](https://codepen.io/meodai/full/pXNpXe).',
        components: [{
          type: 1,
          components: [{
            type: 2,
            style: 1,
            label: 'Pick a Name',
            custom_id: 'role/name'
          }, {
            type: 2,
            style: 1,
            label: 'Pick a Color',
            custom_id: 'role/color'
          }]
        }],
        flags: 64
      });
    }
  }
}
