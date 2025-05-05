const Chance = require('chance').Chance();

module.exports = async (interaction) => {
  const {
    colornames
  } = await import('color-name-list');

  const color = Chance.pickone(colornames);

  interaction.reply({
    embeds: [{
      color: parseInt(color.hex.replace('#', ''), 16),
      title: `${color.name} (${color.hex.toUpperCase()})`,
	    thumbnail: {
		    url: `https://singlecolorimage.com/get/${color.hex.replace('#', '')}/100x100`
	    }
    }]
  });
}
