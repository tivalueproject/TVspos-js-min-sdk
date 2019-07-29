// import "babel-polyfill";
const Account = require('../libs/account');
const Blockchain = require('../libs/blockchain');
var constants = require("../libs/constants");

/*======= Change the below before run ==========*/
const SEED = "123";
const ACCOUNT_INDEX = 0;
const RECIPIENT_ADDR = "u6LHyWGXngJ18JB6JxH1XaqucDscFac8Prh";
/*================ Change end ==================*/

const nodeAddress = "https://testwallet.t.top/api/";
const networkByte = constants.TESTNET_BYTE;

async function sendLeasingTx(chain, tx) {
    const result = await chain.sendLeasingTx(tx);
    console.log(result);
}

// Create Account
const acc = new Account(networkByte);
acc.buildFromSeed(SEED, ACCOUNT_INDEX);

// Create Transaction Object (send 1 VSYS)
var dataInfo = acc.buildLeasing(RECIPIENT_ADDR, 1.0);
dataInfo["signature"] = acc.getSignature(dataInfo, constants.LEASE_TX);
console.log("Request:");
console.log(JSON.stringify(dataInfo));

// Send Transaction
const chain = new Blockchain(networkByte, nodeAddress);
sendLeasingTx(chain, dataInfo);
