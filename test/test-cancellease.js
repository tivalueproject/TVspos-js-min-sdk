import "babel-polyfill";
const Account = require('../libs/account');
const Blockchain = require('../libs/blockchain');
var constants = require("../libs/constants");

/*======= Change the below before run ==========*/
const SEED = "<please input your seed phrase>";
const ACCOUNT_INDEX = 0;
const LEASE_TX_ID = "EXzr6yozXB3oK9YcL7R3VLhwFenHVjixEiMHKL1ahRmo";//"<please input lease tx id>";
/*================ Change end ==================*/

const nodeAddress = "http://test.v.systems:9922";
const networkByte = constants.TESTNET_BYTE;

async function sendCancelLeasingTx(chain, tx) {
    const result = await chain.sendCancelLeasingTx(tx);
    console.log(result);
}

// Create Account
const acc = new Account(networkByte);
acc.buildFromSeed(SEED, ACCOUNT_INDEX);

// Create Transaction Object
var dataInfo = acc.buildCancelLeasing(LEASE_TX_ID);
dataInfo["signature"] = acc.getSignature(dataInfo, constants.CANCEL_LEASE_TX);
console.log("Request:");
console.log(JSON.stringify(dataInfo));

// Send Transaction
const chain = new Blockchain(networkByte, nodeAddress);
sendCancelLeasingTx(chain, dataInfo);
