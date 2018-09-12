const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
//make an instance of Web3 using constructor function, and tells that instance to attempt to connect
//to this local test network hosted on my machine
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) //teaches web3 about what methods an Inbox contract has (interface is ABI)
    .deploy({
      //tells web3 that we want to deploy a new copy of this contract
      data: bytecode,
      arguments: ["Hi there!"]
    })
    .send({ from: accounts[0], gas: "1000000" }); //instructs web3 to send out a transaction that creates this contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
