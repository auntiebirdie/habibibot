// Set up the environment.
require('dotenv').config();

const Chance = require('chance').Chance();
const Cron = require('node-cron');
const JSONdb = require('simple-json-db');

const {
  Client,
  GatewayIntentBits
} = require('discord.js');

// Creates a client for interacting with Discord.
// See https://discordjs.guide/popular-topics/intents.html for more information on Gateway Intents.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
});

// Logs in with the provided token.
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', async () => {
  client.guilds.fetch('1348782866355716177').then((guild) => {
    Cron.schedule('* * * * *', () => {
      const db = new JSONdb(`db/sprint.json`)

      if (db.get('active')) {
        guild.channels.fetch('1348800210435838023').then((channel) => {
          channel.messages.fetch(db.get('message')).then((message) => {
            const sprinters = db.get('sprinters');
            let timeRemaining = 15 - Math.ceil((Date.now() - message.createdTimestamp) / (60 * 1000));

            if (timeRemaining <= 0) {
              message.edit({
                content: 'This sprint has ended.',
                components: []
              });

              if (sprinters.length > 0) {
                message.reply(`All right, the sprint is over.  How did everyone do? ${sprinters.map((sprinter) => '<@' + sprinter + '>').join(' ')}`);
              }

              db.set('active', false);
            } else {
              let content = `There is an ongoing sprint. ${timeRemaining % 2 == 0 ? '⌛' : '⏳'} ${timeRemaining} minute${timeRemaining == 1 ? '' : 's'}` + message.content.split('minutes').pop();

              message.edit({
                content
              });
            }
          }).catch((err) => {
            console.log(err);
            db.set('active', false);
          });
        });
      }
    });

    Cron.schedule('0 * * * *', () => {
      const today = new Date()
      const currentMonth = today.getUTCMonth()
      const currentDay = today.getUTCDate()
      const currentHour = today.getUTCHours()

      const announcementTime = 12;

      if (announcementTime == currentHour) {
        const announcementChannel = '1348788301586366464';

        guild.channels.fetch(announcementChannel).then((channel) => {
          guild.members.fetch().then((members) => {
            members = members.filter((member) => !member.user.bot)
            let birthdayMembers = []

            members.each((member) => {
              const userDb = new JSONdb(`members/${member.id}.json`)
              const birthdayData = userDb.get('birthday')

              if (birthdayData && birthdayData.month == currentMonth && birthdayData.day == currentDay) {
                birthdayMembers.push(`<@${member.id}>`)
              }
            })

            if (birthdayMembers.length > 0) {
              let birthdayList = new Intl.ListFormat('en', {
                style: 'long'
              }).format(birthdayMembers)

              channel.send(`Happy birthday, ${birthdayList}! <:hearthabibi:1349791684892033085>`)
            }
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    });
  });
});

// Executes the logic for an interaction based on the command name.
client.on('interactionCreate', (interaction) => {
  // If the interaction is a message component or modal submit, extract the command name from the custom id.
  if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
    let tmp = interaction.customId.split('_');

    interaction.commandName = tmp.shift(); // Remove the command name from the front of the tmp array
    interaction.customId = tmp.join('_'); // Put the custom ID back together, sans command name
  }

  let filePath = `interactions/${interaction.commandName}`;

  // If the interaction is a slash command, check for subcommand groups and subcommands.
  if (interaction.isChatInputCommand()) {
    if (interaction.options.getSubcommandGroup()) {
      filePath += `/${interaction.options.getSubcommandGroup()}`;
    }

    if (interaction.options.getSubcommand(false)) {
      filePath += `/${interaction.options.getSubcommand()}`;
    }
  }

  require(`./${filePath}.js`)(interaction);
});

client.on('messageCreate', async (message) => {
  if (message.author.id != client.user.id && message.mentions.users.get(client.user.id)) {
    const responses = [
      "Bzzt.",
      "*Bzzt.*",
      "Bzzt!",
      "*Bzzt!*",
      "Beep.",
      "*Beep.*",
      "Beep!",
      "*Beep!*",
      "Beep boop.",
      "*Beep boop.*",
      "Beep boop!",
      "*Beep boop!*",
      "(the camera lens whirrs)",
      "(the camera lens focuses on you)",
      "(floats away)",
      "(floats closer)",
      "(extends an arm to gesture wildly)",
      "(extends an arm to gesture vaguely)",
      "(nods)",
      "(shakes excitedly)",
      "(shakes no)",
      "(shakes nervously)",
      "(nuzzles you)",
      "(does a barrel roll)",
      "(somersaults)",
      "(makes a high-pitched noise)",
      "(makes a low-pitched noise)",
      "(rotates slowly)",
      "(does nothing)",
      "<:habibi:1349791459846393907>",
      "<:hearthabibi:1349791684892033085>",
      "<:joyhabibi:1349791487096914081>",
      "<:lovehabibi:1349791561445150740>",
      "<:pensivehabibi:1349791596992004106>",
      "<:tearhabibi:1349791526674501775>",
      "<:thinkhabibi:1349791646312562718>"
    ];

    message.reply({
      content: Chance.pickone(responses)
    });
  }
});
