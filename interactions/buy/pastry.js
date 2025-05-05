const Chance = require('chance').Chance();

module.exports = function(interaction) {
  var pastries = Chance.shuffle(["croissant", "danish", "muffin", "scone", "eclair", "tart", "strudel", "macaron", "brownie", "donut", "cinnamon roll", "cupcake", "cheesecake", "profiterole", "biscotti", "galette", "puff pastry", "churro", "baklava"]);
  var flavors = Chance.shuffle(["chocolate", "vanilla", "strawberry", "blueberry", "lemon", "raspberry", "almond", "hazelnut", "pistachio", "caramel", "coffee", "matcha", "pumpkin spice", "cinnamon", "gingerbread", "lavender", "rose", "orange", "blackberry", "peach"]);
  var toppings = Chance.shuffle(["powdered sugar", "chocolate drizzle", "caramel drizzle", "whipped cream", "sprinkles", "nuts", "fruit compote", "honey glaze", "cream cheese frosting", "buttercream frosting", "candied fruit", "toasted coconut", "crushed cookies"]);

  var pastry = Chance.pickone(pastries);
  var flavor = Chance.pickone(flavors);
  var topping = Chance.pickone(toppings);

  var sentences = [
    "${pastry}",
    "${flavor} ${pastry}",
    "${pastry} with ${toppings[0]}",
    "${flavor} ${pastry} with ${toppings[0]}",
    "${pastry} with ${toppings[0]} and ${toppings[1]}",
    "${flavor} ${pastry} with ${toppings[0]} and ${toppings[1]}",
    "${flavors[0]} and ${flavors[1]} ${pastry}",
    "${flavors[0]} and ${flavors[1]} ${pastry} with ${topping}",
    "${flavors[0]} and ${flavors[1]} ${pastry} with ${toppings[0]} and ${toppings[1]}"
  ];

  var sentence = eval("`" + Chance.pickone(sentences) + "`");

  interaction.reply({
    content: `Please enjoy your ${sentence}. <:hearthabibi:1349791684892033085>`
  });
}
