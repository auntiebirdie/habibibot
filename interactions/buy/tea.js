const Chance = require('chance').Chance();

module.exports = function(interaction) {
  var teas = {
    "herbal": ["ginger", "turmeric", "sunflower petals", "orange oil", "fennel", "rooibos", "cinnamon", "lemon balm", "chamomile blossom", "lavender", "valerian root", "carob", "lime-tree blossom", "lemongrass", "butterfly pea flower", "passionfruit", "cacao nib", "honeybush", "apple", "marigold", "cardamom", "rose extract", "spearmint", "rosehip", "hibiscus", "strawberry", "wild cherry", "cornflower", "raspberry", "peach"],
    "oolong": ["coconut", "cinnamon", "ginger", "cardamom", "chicory", "cocoa nib", "marigold", "cacao", "cherry", "hazelnut"],
    "black": ["apricot", "ginger", "apple", "peach", "chocolate", "blueberry", "peppermint", "cinnamon", "cornflower", "orange", "black pepper", "hazelnut", "lavender", "creme", "lemon", "pine", "vanilla"],
    "chai": ["dandelion root", "cinnamon", "cacao nib", "clove", "ginger", "cardamom", "rose petal", "lavender", "black pepper", "fennel"],
    "green": ["matcha", "blueberry", "apple", "cinnamon", "rosehip", "cacao nib", "cornflower", "chestnut", "jasmine", "mint", "rhubarb", "strawberry", "sunflower", "pomegranate", "cherry", "mango"]
  }

  var tea = Chance.pickone(Object.keys(teas))
  var flavors = Chance.shuffle(teas[tea])

  var sentences = ["${tea} tea with notes of ${flavors[0]} and ${flavors[1]}", "${tea} tea with notes of ${flavors[0]}, ${flavors[1]}, and ${flavors[2]}", "${flavors[0]} ${tea} tea", "${tea} tea made with ${flavors[0]}"]

  var sentence = eval("`" + Chance.pickone(sentences) + "`");

  interaction.reply({
    content: `Please enjoy your ${sentence}. <:hearthabibi:1349791684892033085>`
  });
}
