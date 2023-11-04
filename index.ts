import fs from "fs";
import humanNames from "human-names";

let likes: string[] = [];
let dislikes: string[] = [];

try {
  likes = (await Bun.file("likes.txt").text()).split("\n");
} catch {}

try {
  dislikes = (await Bun.file("dislikes.txt").text()).split("\n");
} catch {}

while (true) {
  let name = humanNames.femaleRandom();
  while (likes.includes(name) || dislikes.includes(name)) {
    name = humanNames.femaleRandom();
  }

  const confirmation = confirm(`Do you like: ${name}?`);

  if (confirmation) {
    likes.push(name);
    fs.appendFileSync("likes.txt", name + "\n");
  } else {
    dislikes.push(name);
    fs.appendFileSync("dislikes.txt", name + "\n");
  }
}
