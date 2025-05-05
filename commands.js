// Set up the environment.
require('dotenv').config();

const {
  REST,
  Routes
} = require('discord.js');

// Creates a client for interacting with the Discord REST API.
const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

// Sends a PUT request to the Application Guild Commands endpoint of the Discord REST API.
// These are only available on the Coffee Shop server.
rest.put(
  Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, "1348782866355716177"), {
    body: [{
      "name": "birthday",
      "description": "Access the Birthday app.",
      "options": [{
        "name": "set",
        "description": "Set your birthday with the Birthday App.",
        "type": 1,
        "options": [{
          "name": "month",
          "description": "Which month were you born?",
          "type": 10,
          "choices": [{
            "name": "January",
            "value": 0
          }, {
            "name": "February",
            "value": 1
          }, {
            "name": "March",
            "value": 2
          }, {
            "name": "April",
            "value": 3
          }, {
            "name": "May",
            "value": 4
          }, {
            "name": "June",
            "value": 5
          }, {
            "name": "July",
            "value": 6
          }, {
            "name": "August",
            "value": 7
          }, {
            "name": "September",
            "value": 8
          }, {
            "name": "October",
            "value": 9
          }, {
            "name": "November",
            "value": 10
          }, {
            "name": "December",
            "value": 11
          }],
          "required": true
        }, {
          "name": "day",
          "description": "Which day were you born?",
          "type": 10,
          "min_value": 1,
          "max_value": 31,
          "required": true
        }]
      }, {
        "name": "check",
        "description": "Check a member's birthday.",
        "type": 1,
        "dm_permission": false,
        "options": [{
          "name": "member",
          "description": "Whose birthday do you want to check?",
          "type": 6,
          "required": true
        }]
      }]
    }, {
      "name": "icebreaker",
      "description": "Send an icebreaker to the lounge."
    }, {
      "name": "role",
      "description": "Create your own role."
    }, {
      "name": "sprint",
      "description": "Start or join a sprint."
    }, {
      "name": "who",
      "description": "Look up a member's intro (if one exists).",
      "options": [{
        "name": "member",
        "description": "Which person?",
        "type": 6,
        "required": true
      }]
    }, {
      "name": "buy",
      "description": "Buy a drink.",
      "options": [{
        "name": "coffee",
        "description": "Buy a coffee.",
        "type": 1
      }, {
        "name": "tea",
        "description": "Buy a tea.",
        "type": 1
      }, {
        "name": "pastry",
        "description": "Buy a pastry.",
        "type": 1
      }]
    }, {
      "name": "whisper",
      "description": "Whisper a (semi) anonymous message.",
      "type": 1
    }, {
      "name": "news",
      "description": "Send a report to the News Room.",
      "options": [{
        "name": "report",
        "description": "Send a report to the News Room.",
        "type": 1
      }]
    }, {
      "name": "hole",
      "description": "Add or remove the hole lovers role.",
      "type": 1
    }, {
      "name": "tarot",
      "description": "Add or remove the Coffee Coven role.",
      "type": 1
    }, {
      "name": "verify",
      "description": "Verify a member.",
      "type": 1,
      "options": [{
        "name": "member",
        "description": "Who do you want to verify?",
        "type": 6,
        "required": true
      }]
    }, {
      "name": "random",
	    "description": "Generate something random.",
	    "options": [{
		    "name": "color",
		    "description": "Generate a random color.",
		    "type": 1
	    }]
    }]
  }
);


// Sends a PUT request to the Application Commands endpoint of the Discord REST API.
// These are available on every server Habibi is in.
rest.put(
  Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), {
    body: [{
      "name": "play",
      "description": "Would you like to play a game?",
      "options": [{
        "type": 1,
        "name": "stone-loves-egg",
        "description": "Let's play Stone Loves Egg!"
      }, {
        "type": 1,
        "name": "botsweeper",
        "description": "Let's play Botsweeper!"
      }]
    }]
  }
);
