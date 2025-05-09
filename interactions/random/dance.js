const Chance = require('chance').Chance();

module.exports = async (interaction) => {
  const gif = Chance.pickone([
    'https://tenor.com/view/dr-eggman-eggman-robotnik-dr-sonic-gif-14743108834011181290',
    'https://tenor.com/view/eggman-robotnik-floss-eggman-floss-sonic-gif-25602332',
    'https://tenor.com/view/jim-carrey-dr-eggman-gerald-robotnik-doctor-robotnik-dr-robotnik-gif-1531825451399878830',
    'https://tenor.com/view/sega-sonic-the-hedgehog-sonic-dr-robotnik-doctor-robotnik-gif-18633078',
    'https://tenor.com/view/sonic-sonic-the-hedgehog-sonic-x-eggman-dr-eggman-gif-22617011',
    'https://tenor.com/view/sonic-the-hedgehog-eggman-dr-robotnik-dancing-gif-17729293',
    'https://tenor.com/view/eggman-dancing-trophy-gif-8885536212216142667',
    'https://tenor.com/view/metal-sonic-metal-sonic-dancing-gif-21917517',
    'https://tenor.com/view/eggman-cool-dance-boom-sonic-gif-12252195',
    'https://tenor.com/view/sonic-chicken-dance-eggmanissohot-gif-26070294',
    'https://tenor.com/view/sonic2-death-egg-robot-chicken-dance-eggman-dr-robotnik-gif-25602097',
    'https://tenor.com/view/good-afternoon-dance-sonic-gif-12090361',
    'https://tenor.com/view/dance-hype-excited-pumped-dr-robotnik-gif-15534200',
    'https://tenor.com/view/robotnik-giant-eggman-robot-rock-dr-robotnik-jim-carrey-gif-25499466',
    'https://tenor.com/view/shadow-sonic-sonic-the-hedgehog-shadow-the-hedgehog-sonic-dance-gif-15877477',
    'https://tenor.com/view/shadow-the-hedgehog-dance-shadow-the-hedgehog-dance-dancing-sonic-gif-3324127736038632834',
    'https://tenor.com/view/fearless-year-of-shadow-shadow-the-hedgehog-shadow-dance-shadow-hedgehog-dance-gif-17703780801293310339',
    'https://tenor.com/view/shadow-dance-shadow-the-hedgehog-sth-gif-14361240',
    'https://tenor.com/view/shadow-shadow-the-hedgehog-pokedance-dance-gif-gif-3414808025223443659',
    'https://tenor.com/view/shadow-the-hedgehog-shadow-maria-maria-robotnik-space-colony-ark-gif-8414271005818206187',
    'https://tenor.com/view/shadow-the-hedgehog-shadow-sonic-the-hedgehog-sonic-chibi-gif-16928999265873305855',
    'https://tenor.com/view/sonic-the-hedgehog-guitar-dancing-gif-27107217',
    'https://tenor.com/view/sonic-floss-awesome-dance-fortnite-gif-17937037',
    'https://tenor.com/view/sonic-movie2-sonic-dance-sonic-the-hedgehog-raise-the-roof-party-gif-25481691',
    'https://tenor.com/view/sonic-the-hedgehog-dancing-dance-mascots-mascot-gif-16361134',
    'https://tenor.com/view/sonic-sonic-the-hedgehog-shadow-shadow-the-hedgehog-miku-gif-6303931601122865308',
    'https://tenor.com/view/shadow-the-hedgehog-dancing-cute-adorable-silly-gif-1038430469054998793',
    'https://tenor.com/view/sonic-06-silver-the-hedehog-sonic-the-hedgehog-sonic-dance-silver-gif-3268873629769112608',
    'https://tenor.com/view/lythero-sonic-the-hedgehog-dance-gif-7985200935655645069',
    'https://tenor.com/view/sonic-the-hedgehog-sonic-generations-sonic-and-his-backup-dancers-sonic-dance-gif-17043735546047024263',
    'https://tenor.com/view/sonic-the-hedgehog-knuckles-knuckles-show-dance-tiktok-dance-gif-16645011227669549086',
    'https://tenor.com/view/sonic-villains-knuckles-dancing-gif-13910722683593823116',
    'https://tenor.com/view/sonic-sonic-the-hedgehog-sonic2-sonic-the-hedgehog2-sonic-movie2-gif-25592239',
    'https://tenor.com/view/sonicprime-knuckles-knucklesthedread-sonicthehedgehog-dance-gif-1058611511137157375',
    'https://tenor.com/view/sonic-sonic-the-hedgehog-sonic-boom-sonic-dance-dancing-gif-17806509',
    'https://tenor.com/view/dancing-chao-chao-sonic-adventure2battle-sonic-adventure-battle2-sonic-gif-20879342',
    'https://tenor.com/view/chao-sonic-chao-dance-dancing-groove-gif-25729368',
    'https://tenor.com/view/chao-dance-chao-garden-sonic-sonic-chao-gif-25171509',
    'https://tenor.com/view/sonic-doctor-eggman-robotnik-dance-dancing-gif-14797123',
    'https://tenor.com/view/sonic-underground-dance-party-wiggle-dr-robotnik-gif-7221313'
  ]);

  interaction.reply({
    content: gif
  });
}