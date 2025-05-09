const Chance = require('chance').Chance();
const JSONdb = require('simple-json-db');

module.exports = function(interaction) {
  const webhookDb = new JSONdb('db/webhooks.json');
  const webhooks = webhookDb.get('welcome-in');

  const db = new JSONdb('db/wave.json');
  const lastUsedWebhook = db.get('lastUsedWebhook');
  const availableWebhook = webhooks.find((webhook) => webhook[0] != lastUsedWebhook);

  db.set('lastUsedWebhook', availableWebhook[0]);

  interaction.client.fetchWebhook(availableWebhook[0], availableWebhook[1]).then((webhook) => {
    webhook.edit({
      name: interaction.member.displayName,
      avatar: interaction.member.displayAvatarURL()
    }).then((webhook) => {
      interaction.deferUpdate();

      let user = interaction.message.mentions.users.first();

      if (!user) {
        let matches = interaction.message.content.match(/<@([0-9]+)>/g)

        if (matches) {
          user = {
            id: matches[0].replace(/[^0-9]+/g,
              '')
          };
        }
      }

      interaction.guild.members.fetch(user.id).then((member) => {
        const greeting = Chance.pickone([
          'Hello',
          'Hi',
          'Hey there',
          'Nice to meet you'
        ]);

        const lastUsedGif = db.get('lastUsedWelcomeGif');

        const gif = Chance.pickone([
          'https://tenor.com/view/sonic2-eggman-guitar-leg-guitar-agent-stone-gif-25602088',
          'https://tenor.com/view/sonic2-agent-stone-jazz-hands-sonic-the-hedgehog-sonic-the-hedgehog2-gif-25600162',
          'https://tenor.com/view/eggman-sonic-movie2-gif-25590957',
          'https://tenor.com/view/lee-majdoub-agent-stone-shadow-the-hedgehog-shadow-sonic-movie-3-gif-14747047754208025798',
          'https://tenor.com/view/agent-stone-dr-eggman-sonic-3-movie-sonic-3-dr-robotnik-gif-2605717778013432286',
          'https://tenor.com/view/agent-stone-hes-back-sonic2-cheer-sonic-the-hedgehog-gif-25600046',
          'https://tenor.com/view/stone-agent-stone-robotnik-stobotnik-stone-x-robotnik-gif-10329320526553954887',
          'https://tenor.com/view/eggman-robotnik-sonic-sega-scared-gif-12649399175493662108',
          'https://tenor.com/view/eggman-robotnik-laughing-gif-21145698',
          'https://tenor.com/view/jim-carrey-dr-eggman-gerald-robotnik-doctor-robotnik-dr-robotnik-gif-1531825451399878830',
          'https://tenor.com/view/sonic-sonic-3-robotnic-robotnik-dr-eggman-gif-4256569367600289149',
          'https://tenor.com/view/eggman-dancing-trophy-gif-8885536212216142667',
          'https://tenor.com/view/shocked-dr-robotnik-sonic-the-hedgehog-3-surprised-whoa-gif-11839987595815375250',
          'https://tenor.com/view/turning-around-dr-ivo-robotnik-jim-carrey-sonic-3-sonic-the-hedgehog-gif-14539574738048594634',
          'https://tenor.com/view/eggman-jim-carrey-sonic-sonic-3-sonic-movie-gif-13523944117938754207',
          'https://tenor.com/view/dr-robotnik-sonic-movie-eggman-eggman-music-eggman-music-scene-gif-25321895'
        ].filter((gif) => gif != lastUsedGif));

        webhook.send({
          content: interaction.user.id == user.id ? `${greeting}!` : `${greeting}, <@${user.id}>!`
        }).then(() => {
          db.set('lastUsedWelcomeGif', gif);

          webhook.send({
            content: gif
          });
        });
      }).catch((err) => {
        webhook.send({
          content: `${Chance.pickone(['Bye', 'We\'ll miss you', 'See ya', 'Goodbye'])}, <@${user.id}>!`
        }).then(() => {
          const lastUsedGif = db.get('lastUsedFarewellGif');

          const gif = Chance.pickone([
            'https://tenor.com/view/sonic-3-explosion-space-gif-1932836181837408000',
            'https://tenor.com/view/eggman-robotnik-peace-out-peace-see-ya-gif-22741915',
            'https://tenor.com/view/sonic2-later-hater-eggman-dr-robotnik-dr-eggman-gif-25602194',
            'https://tenor.com/view/gerald-robotnik-sonic-the-hedgehog-shadow-the-hedgehog-dr-eggman-gerald-death-gif-2906626257918042623',
            'https://tenor.com/view/gerald-robotnik-gerald-gerald-sonic-sonic-3-movie-jetsons-gif-11860029930682789789',
            'https://tenor.com/view/sonic-the-hedgehog-3-sonic-3-dr-eggman-eggman-eggman-crying-gif-1232895245309200547',
            'https://tenor.com/view/sonic2-eggman-knuckles-dodge-punch-gif-25599846'
          ].filter((gif) => gif != lastUsedGif));

          db.set('lastUsedFarewellGif', gif);

          webhook.send({
            content: gif
          });
        });
      });
    }).catch((err) => {
      console.error(err);
    });
  }).catch((err) => {
    console.error(err);
    interaction.reply({
      content: "Something went wrong. <:sobhabibi:1351611525672206366>",
      flags: 64
    });
  });
}
