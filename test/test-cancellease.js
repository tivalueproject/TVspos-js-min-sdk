import "babel-polyfill";
const AccLib = require('../libs/account');
const Acc = AccLib.Account;
const ChainLib = require('../libs/blockchain');
const API = ChainLib.Blockchain;
var constants = require("../libs/constants");

const seed = "<please input your seed phrase>";
const nodeAddress = "http://test.v.systems:9922";
var accountIndex = 0;

async function sendCancelLeasingTx(tx) {
    const result = await API.sendCancelLeasingTx(nodeAddress, tx);
    console.log(result);
}

// Create Account
const acc = Acc.buildFromSeedOnTestnet(seed, accountIndex);

// Create Transaction Object
var dataInfo = Acc.buildCancelLeasing("<please input lease tx id>");
dataInfo["senderPublicKey"] = acc.publicKey;
dataInfo["signature"] = Acc.getSignature(dataInfo, constants.CANCEL_LEASE_TX, acc.privateKey);
console.log("Request:");
console.log(JSON.stringify(dataInfo));

// Send Transaction
sendCancelLeasingTx(dataInfo);
