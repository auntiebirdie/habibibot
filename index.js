// Set up the environment.
require('dotenv').config();

const Chance = require('chance').Chance();
const Cron = require('node-cron');
const JSONdb = require('simple-json-db');

const {
  Client,
  GatewayIntentBits,
	Partials
} = require('discord.js');

// Creates a client for interacting with Discord.
// See https://discordjs.guide/popular-topics/intents.html for more information on Gateway Intents.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
  partials: [Partials.Channel]
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

      const announcementTime = 13;

      if (announcementTime == currentHour) {
        const announcementChannel = '1348788301586366464';

        guild.channels.fetch(announcementChannel).then((channel) => {
          guild.members.fetch().then((members) => {
            members = members.filter((member) => !member.user.bot)
            let birthdayMembers = []

            members.each((member) => {
              const userDb = new JSONdb(`db/members/${member.id}.json`)
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
    let tmp = interaction.customId.split('^')
    tmp = tmp[0].split('_')

    interaction.commandName = tmp.shift(); // Remove the command name from the front of the tmp array
    interaction.customId = tmp.join('_'); // Put the custom ID back together, sans command name
  } else if (interaction.isContextMenuCommand && interaction.isContextMenuCommand()) {
    interaction.commandName = interaction.commandName.toLowerCase().replace(/\s/g, '');
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

client.on('guildMemberAdd', (member) => {
  if (member.guild.id == '1348782866355716177') {
    member.guild.channels.fetch('1348786174721785886').then((channel) => {
      channel.send({
        content: `*Beep boop!* Welcome to the coffee shop, <@${member.id}>!  Please check out the <#1348782867018420394> for rules and instructions on how to unlock the rest of the server.`,
        components: [{
          type: 1,
          components: [{
            type: 2,
            style: 2,
            label: 'Wave to say hi!',
            custom_id: 'wave',
            emoji: {
              id: '1349791684892033085',
              name: 'hearthabibi'
            }
          }]
        }]
      }).then((message) => {
        const db = new JSONdb(`db/members/${member.id}.json`);

        db.set('welcomeMessage', message.id);
      });
    });
  }
});

client.on('guildMemberRemove', (member) => {
  if (member.guild.id == '1348782866355716177') {
    const db = new JSONdb(`db/members/${member.id}.json`);

    const welcomeMessageId = db.get('welcomeMessage');

    if (welcomeMessageId) {
      member.guild.channels.fetch('1348786174721785886').then((channel) => {
        channel.messages.fetch(welcomeMessageId).then((message) => {
          message.edit({
            content: `*Beep boop!* <@${member.id}> has left the coffee shop. They couldn't handle our rizz!`,
            components: [{
              type: 1,
              components: [{
                type: 2,
                style: 2,
                label: 'Wave to say bye!',
                custom_id: 'wave',
                emoji: {
                  id: '1351611525672206366',
                  name: 'sobhabibi'
                }
              }]
            }]
          });
        });
      });
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.id != client.user.id) {
    if (message.mentions.users.get(client.user.id)) {
      const options = [...message.content.matchAll(/^\d+\.\s(.+)$/gm)].map(match => match[1])

      if (options.length > 0) {
        message.reply({
          content: `<:thinkhabibi:1349791646312562718> ... *Beep!*\r\n\r\n \`${Chance.pickone(options)}\` <:hearthabibi:1349791684892033085>`
        });
      } else {
        delete require.cache[require.resolve('./data/responses.json')];

        const responses = require('./data/responses.json');

        const emoji = [
          "<:habibi:1349791459846393907>",
          "<:hearthabibi:1349791684892033085>",
          "<:joyhabibi:1349791487096914081>",
          "<:lovehabibi:1349791561445150740>",
          "<:pensivehabibi:1349791596992004106>",
          "<:tearhabibi:1349791526674501775>",
          "<:thinkhabibi:1349791646312562718>",
          "<:partyhabibi:1351611666604757032>",
          "<:eyehabibi:1351611495347388456>",
          "<:sobhabibi:1351611525672206366>"
        ];

        message.reply({
          content: Chance.pickone([...responses, ...emoji])
        });
      }
    } else {
      if (message.guild.id == "1348782866355716177") {
        const date = new Date();
        const dayOfWeek = date.getDay();

        if (message.channel.id == "1348788301586366464" && dayOfWeek == 5 && message.content.toLowerCase().includes('fingers')) {
          if (Chance.bool({
              likelihood: 30
            })) {
            message.reply({
              content: 'https://64.media.tumblr.com/8a7cb94ca29defc5bf4097ced1f2aca6/0884b3a5f5ea3361-02/s540x810/b77bf29ec2e0e86362d636c8a8ac9a1622db230b.gif'
            })
          }
        } else if (message.channel.id == "1348788301586366464" && dayOfWeek == 6 && message.content.toLowerCase().includes('saturday')) {
          if (Chance.bool({
              likelihood: 30
            })) {
            message.reply({
              content: 'https://tenor.com/view/agent-stone-sonic-movie-stobotnik-gif-24250450'
            });
          }
        }
      }
    }
  }
});
