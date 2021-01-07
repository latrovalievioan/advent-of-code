const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

let rules = input.split(/\n/gi);

let counter = 0;

rules = rules.map((rule) => rule.split("contain"));

const objs = {};

rules.forEach((rule) => {
  objs[rule[0].replace("bags", "").replace(/\s*/g, "")] = rule[1]
    .replace(/[^a-z]/g, "")
    .split(/bags?/)
    .filter((x) => x);
});

const findRoot = (obj) => {
  const roots = [];
  for (let i = 0; i < Object.entries(obj).length; i++) {
    let currentColor = Object.entries(obj)[i][0];
    let hasFound = false;
    for (let j = 0; j < Object.values(obj).flatMap((x) => x).length; j++) {
      let currentRule = Object.values(obj).flatMap((x) => x)[j];

      if (currentColor === currentRule) hasFound = true;
    }
    if (!hasFound) roots.push(currentColor);
  }
  return roots;
};

console.log(findRoot(objs));
