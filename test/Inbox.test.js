const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
//make an instance of Web3 using constructor function, and tells that instance to attempt to connect
//to this local test network hosted on my machine
const provider = ganache.provider();
const web3 = new Web3(provider);
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

  inbox.setProvider(provider);
});

//inbox is the contract, .methods is all of the methods on that contract.
describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Bye!").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye!");
  });
});
