const x = new Set([1, 2, 3, 4, 5, 7, 42, 34, 37, 25, 49]);

const y = new Set([3, 4, 5, 6, 7, 8]);

for (const el of y) {
  if (x.has(el)) console.log(el);
}
