const Chance = require('chance').Chance();

module.exports = function(interaction) {
  var flavors = Chance.shuffle(["caramel", "chocolate", "white chocolate", "dark chocolate", "butterscotch", "vanilla", "pumpkin spice", "peppermint", "cinnamon dolce", "gingerbread", "pistachio", "praline", "hazelnut", "buttercup", "rose", "marigold", "chestnut praline", "butter pecan", "lavender", "sage", "rosemary", "violet", "juniper berry", "black cherry", "cardamom", "orange", "chai", "matcha"]);
  var coffees = Chance.shuffle(["cappuccino", "macchiato", "latte", "americano", "espresso", "flat white", "cortado", "mocha", "affogato", "cafe au lait", "cold brew", "iced coffee", "doppio", "lungo", "galao"]);
  var additions = Chance.shuffle(["goat milk", "whole milk", "skim milk", "oat milk", "almond milk", "half-and-half", "sugar", "honey", "simple syrup", "cinnamon", "cream", "coconut milk", "foam", "marshmallows"]);

  var flavor = Chance.pickone(flavors);
  var coffee = Chance.pickone(coffees);
  var addition = Chance.pickone(additions);

  var sentences = ["${coffee}", "${flavor} ${coffee}", "${coffee} with ${additions[0]}", "${flavor} ${coffee} with ${additions[0]}", "${coffee} with ${additions[0]} and ${additions[1]}", "${flavor} ${coffee} with ${additions[0]} and ${additions[1]}", "${flavors[0]} and ${flavors[1]} ${coffee}", "${flavors[0]} and ${flavors[1]} ${coffee} with ${addition}", "${flavors[0]} and ${flavors[1]} ${coffee} with ${additions[0]} and ${additions[1]}"];

  var sentence = eval("`" + Chance.pickone(sentences) + "`");

  interaction.reply({
    content: `Please enjoy your ${sentence}. <:hearthabibi:1349791684892033085>`
  });
}
