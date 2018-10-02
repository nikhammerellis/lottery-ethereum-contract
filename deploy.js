const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const mnemonic = require("./secrets");

const provider = new HDWalletProvider(
  mnemonic,
  "https://rinkeby.infura.io/v3/17a0907aaeff464099782644eacda9f1"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);
  console.log("contract deployed to: ", result.options.address);
};
deploy();
