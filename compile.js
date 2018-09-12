const path = require("path");
const fs = require("fs");
const solc = require("solc");

//using path helps it work on both windows or unix based systems
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

console.log(solc.compile(source, 1));
