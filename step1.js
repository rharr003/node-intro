const fs = require("fs");
const path = process.argv[2];
function cat(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

cat(path);
