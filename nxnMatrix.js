n = 3;

let answersSet = new Array();
let combinationSet = new Array();
let current = 0;

for (let i = 1; i <= n * n; i++) {
  answersSet.push(i);
  if (answersSet.length == n) {
    combinationSet.push(answersSet);
    answersSet = [];
  }
}

for (let i = 1; i <= n; i++) {
  answersSet.push(i);
  current = i;

  for (let j = 1; j < n; j++) {
    answersSet.push(current + n);
    current = current + n;
  }

  if (answersSet.length == n) {
    combinationSet.push(answersSet);
    answersSet = [];
  }
}

for (let i = 1; i <= n * n; i++) {
  for (let j = 1; j <= n * n; j++) {
    if (i - j == 0) {
      answersSet.push(i);
      current = i;
      for (let r = 1; r < n; r++) {
        answersSet.push(current + n + 1);
        current = current + n + 1;
      }
      if (answersSet.length == n) {
        combinationSet.push(answersSet);
      }
    }
  }
  if (answersSet.length == n) {
    answersSet = [];
    break;
  }
}

for (let i = 1; i <= n * n; i++) {
  for (let j = 1; j <= n * n; j++) {
    if (i + j == n + 1) {
      answersSet.push(j);
      current = j;
      for (let r = 1; r < n; r++) {
        answersSet.push(current + n - 1);
        current = current + n - 1;
      }
      if (answersSet.length == n) {
        combinationSet.push(answersSet);
      }
    }
  }
  if (answersSet.length == n) {
    answersSet = [];
    break;
  }
}
