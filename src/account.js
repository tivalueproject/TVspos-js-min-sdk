"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

import "babel-polyfill";
import BigNumber from 'bignumber.js'
var crypto_1 = require("../libs/utils/crypto");
var base58_1 = require("../libs/utils/base58");
var tx_1 = require("../libs/utils/transaction");
const { TX_FEE, VSYS_PRECISION, FEE_SCALE } = require("../libs/constants");

function convertAmountToMinimumUnit(amountStr) {
    var amount = Number(amountStr) * VSYS_PRECISION;
    if (amount > Number.MAX_SAFE_INTEGER) {
        amount = BigNumber(amountStr).multipliedBy(VSYS_PRECISION).toFixed(0)
    }
    return amount;
}

module.exports = class Accout {

    constructor(networkByte) {
        this.networkByte = networkByte;
    }

    build(privateKey, publicKey, address) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.address = address
    }
    
    buildFromSeed(seed, nonce) {
        var keyPair = crypto_1.default.buildKeyPair(seed, nonce);
        this.privateKey = base58_1.default.encode(keyPair.privateKey);
        this.publicKey = base58_1.default.encode(keyPair.publicKey);
        this.address = crypto_1.default.buildRawAddress(keyPair.publicKey, this.networkByte);
    }

    buildPayment(recipient, amount, base58Attachment, timestamp) {
        if (!timestamp) {
            timestamp = Date.now() * 1e6;
        }
        if (!base58Attachment) {
            base58Attachment = '';
        }
        var dataInfo = {
            senderPublicKey: this.publicKey,
            recipient: recipient,
            amount: convertAmountToMinimumUnit(amount),
            fee: TX_FEE * VSYS_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp,
            attachment: base58Attachment
        }
        return dataInfo;
    }

    buildLeasing(recipient, amount, timestamp) {
        if (!timestamp) {
            timestamp = Date.now() * 1e6;
        }
        var dataInfo = {
            senderPublicKey: this.publicKey,
            recipient: recipient,
            amount: convertAmountToMinimumUnit(amount),
            fee: TX_FEE * VSYS_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp
        }
        return dataInfo;
    }

    buildCancelLeasing(leaseTxId, timestamp) {
        if (!timestamp) {
            timestamp = Date.now() * 1e6;
        }
        var dataInfo = {
            senderPublicKey: this.publicKey,
            txId: leaseTxId,
            fee: TX_FEE * VSYS_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp
        }
        return dataInfo;
    }

    checkAddress() {
        return crypto_1.default.isValidAddress(this.address, this.networkByte)
    }

    getSignature(transferData, txType) {
        return crypto_1.default.buildTransactionSignature(tx_1.default.toBytes(transferData, txType), this.privateKey);
    }
};