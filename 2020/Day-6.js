const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

//part 1 solution
let groups = input.split(/\n\n/);

// let counter = 0;

// groups.forEach((group) => {
//   let set = new Set();
//   for (let i = 0; i < group.length; i++) {
//     if (group[i] !== "\n") set.add(group[i]);
//   }
//   counter += set.size;
// });

// console.log(counter);

//part 2 solution

let counter = 0;
groups = groups.map((group) => group.split("\n"));

let persons = [];
let dicts = [];
for (let i = 0; i < groups.length; i++) {
  let currentGroup = groups[i];
  let dict = {};
  let count = 0;
  for (let j = 0; j < currentGroup.length; j++) {
    count++;
    let currentPerson = currentGroup[j];
    for (let x = 0; x < currentPerson.length; x++) {
      let currentLetter = currentPerson[x];
      if (dict[currentLetter] === undefined) {
        dict[currentLetter] = 1;
      } else {
        dict[currentLetter]++;
      }
    }
    persons[i] = count;
  }
  dicts.push(dict);
}
for (let i = 0; i < dicts.length; i++) {
  for (let j = 0; j < Object.entries(dicts[i]).length; j++) {
    if (Object.entries(dicts[i])[j][1] === persons[i]) {
      counter++;
    }
  }
}

console.log(persons, dicts, groups);
console.log(counter);
