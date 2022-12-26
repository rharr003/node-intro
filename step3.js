const fs = require("fs");
const axios = require("axios");
let mode, path, type, new_path;

let result = "";

function handleArgs(args) {
  if (args[2] !== "--out") {
    mode = "log";
    path = args[2];
    type = args[3];
  } else if (args[2] === "--out") {
    mode = "out";
    path = args[4];
    type = args[5];
    new_path = args[3];
  }
}

handleArgs(process.argv);

function cat(mode, path, type, new_path) {
  if (type === "readfile") {
    processPath(path, mode, new_path);
  } else if (type === "url") {
    processUrl(path, mode, new_path);
  }
}

function write(new_path, data) {
  fs.writeFile(new_path, data, function (err, data) {
    if (err) throw err;
    console.log("succesful write");
  });
}

async function processUrl(url, mode, new_path) {
  const response = await axios.get(url);
  if (mode === "log") {
    console.log(response.data);
  } else if (mode === "out" && new_path) {
    write(new_path, response.data);
  }
}

function processPath(path, mode, new_path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if (mode === "log") {
        console.log(data);
      } else if (mode === "out" && new_path) {
        write(new_path, data);
      }
    }
  });
}

cat(mode, path, type, new_path);
