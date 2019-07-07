import "babel-polyfill";
const Account = require('../libs/account');
const Blockchain = require('../libs/blockchain');
var constants = require("../libs/constants");

/*======= Change the below before run ==========*/
const SEED = "<please input your seed phrase>";
const ACCOUNT_INDEX = 0;
const RECIPIENT_ADDR = "AU83FKKzTYCue5ZQPweCzJ68dQE4HtdMv5U";
/*================ Change end ==================*/

const nodeAddress = "http://test.v.systems:9922";
const networkByte = constants.TESTNET_BYTE;

async function sendPaymentTx(chain, tx) {
    const result = await chain.sendPaymentTx(tx);
    console.log(result);
}

// Create Account
const acc = new Account(networkByte);
acc.buildFromSeed(SEED, ACCOUNT_INDEX);

// Create Transaction Object (send 1 VSYS)
var dataInfo = acc.buildPayment(RECIPIENT_ADDR, 1.0);
dataInfo["signature"] = acc.getSignature(dataInfo, constants.PAYMENT_TX);
console.log("Request:");
console.log(JSON.stringify(dataInfo));

// Send Transaction
const chain = new Blockchain(networkByte, nodeAddress);
sendPaymentTx(chain, dataInfo);