const fs = require("fs");
const axios = require("axios");
const url = process.argv[2];
async function cat(url) {
  const response = await axios.get(url);
  console.log(response.data);
}

cat(url);
