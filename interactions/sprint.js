const JSONdb = require('simple-json-db')

module.exports = function(interaction) {
  if (interaction.channel.id != "1348800210435838023") {
    interaction.reply({
      content: 'Please keep sprints to the <#1348800210435838023> channel.',
      flags: 64
    });
  }

  const db = new JSONdb(`db/sprint.json`)

  if (interaction.customId) {
    switch (interaction.customId) {
      case 'join':
        joinSprint();
        break;
      case 'leave':
        leaveSprint();
        break;
    }
  } else {
    if (db.get('active')) {
      joinSprint();
    } else {
      startSprint();
    }
  }

  function startSprint() {
    interaction.reply({
      content: `A new sprint has started! ⏳ 15 minutes\r\n\r\nSprinters: <@${interaction.user.id}>`,
      components: [{
        type: 1,
        components: [{
          type: 2,
          style: 1,
          customId: 'sprint_join',
          label: 'Join'
        }, {
          type: 2,
          style: 2,
          customId: 'sprint_leave',
          label: 'Leave'
        }]
      }],
      withResponse: true
    }).then((response) => {
      db.set('active', true);
      db.set('message', response.resource.message.id);
      db.set('sprinters', [interaction.user.id]);
    });
  }

  function joinSprint() {
    if (db.get('active')) {
      const sprinters = db.get('sprinters');

      if (sprinters.includes(interaction.user.id)) {
        interaction.reply({
          content: 'You already joined this sprint!',
          flags: 64
        });
      } else {
        if (interaction.deferUpdate) {
          interaction.deferUpdate();
        } else {
          interaction.reply({
            content: "You've been added to the active sprint.",
            flags: 64
          });
        }

        sprinters.push(interaction.user.id);
        updateSprinters();
      }
    } else {
      startSprint();
    }
  }

  function leaveSprint() {
    if (db.get('active')) {
      const sprinters = db.get('sprinters');

      if (sprinters.includes(interaction.user.id)) {
        interaction.deferUpdate();
        db.set('sprinters', sprinters.filter((sprinter) => sprinter != interaction.user.id));
        updateSprinters();
      } else {
        interaction.reply({
          content: "You haven't joined this sprint.",
          flags: 64
        });
      }
    } else {
      interaction.reply({
        content: "There isn't an active sprint right now.",
        flags: 64
      });
    }
  }

  function updateSprinters() {
    interaction.channel.messages.fetch(db.get('message')).then((message) => {
      const sprinters = db.get('sprinters');
      const content = message.content.split('Sprinters:').shift() + `Sprinters: ${sprinters.length > 0 ? sprinters.map((sprinter) => '<@' + sprinter + '>').join(' ') : '*No one...*'}`;

      message.edit({
        content
      });
    });
  }
}
