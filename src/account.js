"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

import "babel-polyfill";
import BigNumber from 'bignumber.js'
var crypto_1 = require("../libs/utils/crypto");
var base58_1 = require("../libs/utils/base58");
var tx_1 = require("../libs/utils/transaction");
const { TESTNET_BYTE, MAINNET_BYTE, TX_FEE, VSYS_PRECISION, FEE_SCALE } = require("../libs/constants");


function buildFromSeed(networkByte, seed, nonce = 0) {
    var keyPair = crypto_1.default.buildKeyPair(seed, nonce);
    var result = {}
    result["privateKey"] = base58_1.default.encode(keyPair.privateKey);
    result["publicKey"] = base58_1.default.encode(keyPair.publicKey);
    result["address"] = crypto_1.default.buildRawAddress(keyPair.publicKey, networkByte);
    return result;
}

exports.Account = {

    buildFromSeedOnTestnet: function (seed, nonce = 0) {
        return buildFromSeed(TESTNET_BYTE, seed, nonce);
    },

    buildFromSeedOnMainnet: function (seed, nonce = 0) {
        return buildFromSeed(MAINNET_BYTE, seed, nonce);
    },


    buildPayment: function (recipient, amount, attachment = '', timestamp = 0) {
        if (!timestamp) {
            timestamp = Date.now() * 1e6;
        }
        var dataInfo = {
            recipient: recipient,
            amount: BigNumber(amount).multipliedBy(VSYS_PRECISION).toFixed(0),
            fee: TX_FEE * VSYS_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp,
            attachment: attachment
        }
        return dataInfo;
    },

    buildLeasing: function (recipient, amount, timestamp = 0) {
        if (!timestamp) {
            timestamp = Date.now() * 1e6;
        }
        var dataInfo = {
            recipient: recipient,
            amount: BigNumber(amount).multipliedBy(VSYS_PRECISION).toFixed(0),
            fee: TX_FEE * VSYS_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp
        }
        return dataInfo;
    },

    buildCancelLeasing: function (leaseTxId, timestamp = 0) {
        if (!timestamp) {
            timestamp = Date.now() * 1e6;
        }
        var dataInfo = {
            txId: leaseTxId,
            fee: TX_FEE * VSYS_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp
        }
        return dataInfo;
    },

    checkAddress: function (address, networkByte) {
        return crypto_1.default.isValidAddress(address, networkByte)
    },

    checkAddressOnTestnet: function (address) {
        return crypto_1.default.isValidAddress(address, TESTNET_BYTE)
    },

    checkAddressOnMainnet: function (address) {
        return crypto_1.default.isValidAddress(address, MAINNET_BYTE)
    },

    getSignature: function (transferData, txType, privateKey) {
        return crypto_1.default.buildTransactionSignature(tx_1.default.toBytes(transferData, txType), privateKey);
    }
};