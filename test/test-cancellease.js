// import "babel-polyfill";
const Account = require('../libs/account');
const Blockchain = require('../libs/blockchain');
var constants = require("../libs/constants");

/*======= Change the below before run ==========*/
const SEED = "123";
const ACCOUNT_INDEX = 0;
const LEASE_TX_ID = "5dBzmDD1QC5j98Txpe6kF2agmDA5U5xZB2noLRTSTna1";//"<please input lease tx id>";
/*================ Change end ==================*/

const nodeAddress = "https://testwallet.t.top/api/";
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
