import fs from "fs";
import readline from "readline";
const input = fs.createReadStream("magesh.txt");
const rl = readline.createInterface({
  input: input,
  terminal: false,
});
const array = [];
rl.on("line", (line) => {
  //   const data = line.split(" ");
  //   console.log(data[0]);
  array.push(line);
});

rl.on("close", () => {
  const data = array.shift();
  console.log("period", data);
  console.log(array);
});
