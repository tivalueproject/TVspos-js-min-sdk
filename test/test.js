const base58_1 = require("base-58");
const convert_1 = require("../libs/utils/convert");
const Account = require('../libs/account');
const Blockchain = require('../libs/blockchain');
var   constants = require("../libs/constants");

const nodeAddress = "https://wallet.t.top/api/";

const SEED = "123";
const ACCOUNT_INDEX = 0;

const RECIPIENT_ADDR = "tvKJvRm9196aRW6oUKQXZN2ji1UCpMP34p6";

// Create Account
const acc = new Account(constants.MAINNET_BYTE);
acc.buildFromSeed(SEED, ACCOUNT_INDEX);
// Get address
console.log("address:",acc.address);
// Get privateKey
console.log("privateKey:",acc.privateKey);


async function sendPaymentTx(chain, tx) {
    const result = await chain.sendPaymentTx(tx);
    //console.log(result);
}


// prepare attachment
var attachmentText = "payment attachment";
var attachmentBytes = Uint8Array.from(convert_1.default.stringToByteArray(attachmentText));
var attachmentBase58 = base58_1.encode(attachmentBytes);

// Create Transaction Object (send 1 TV)
var dataInfo = acc.buildPayment(RECIPIENT_ADDR, 1.0, attachmentBase58);
dataInfo["signature"] = acc.getSignature(dataInfo, constants.PAYMENT_TX);

// Send Transaction
const chain = new Blockchain(constants.MAINNET_BYTE, nodeAddress);
sendPaymentTx(chain, dataInfo);
