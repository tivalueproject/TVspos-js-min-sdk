"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

import "babel-polyfill";
import BigNumber from 'bignumber.js'
var crypto_1 = require("../libs/utils/crypto");
var axlsign_1 = require("axlsign");
var base58_1 = require("base-58");
var tx_1 = require("../libs/utils/transaction");
var concat_1 = require("../libs/utils/concat");
var constants = require("../libs/constants");
const { TX_FEE, TV_PRECISION, FEE_SCALE } = require("../libs/constants");

function convertAmountToMinimumUnit(amountStr) {
    var amount = Number(amountStr) * TV_PRECISION;
    if (amount > Number.MAX_SAFE_INTEGER) {
        amount = BigNumber(amountStr).multipliedBy(TV_PRECISION).toFixed(0)
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
        this.privateKey = base58_1.encode(keyPair.privateKey);
        this.publicKey = base58_1.encode(keyPair.publicKey);
        this.address = this.publicKeyToAddress(keyPair.publicKey);
    }

    buildFromPrivatekey(privateKey) {
        var privateKeyBytes = base58_1.decode(privateKey);
        var publicKeyBytes = axlsign_1.derivePublicKey(privateKeyBytes)
        this.privateKey = base58_1.encode(privateKeyBytes);
        this.publicKey = base58_1.encode(publicKeyBytes);
        this.address = this.publicKeyToAddress(publicKeyBytes);
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
            fee: TX_FEE * TV_PRECISION,
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
            fee: TX_FEE * TV_PRECISION,
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
            fee: TX_FEE * TV_PRECISION,
            feeScale: FEE_SCALE,
            timestamp: timestamp
        }
        return dataInfo;
    }

    checkAddress() {
        if (!this.address || typeof this.address !== 'string') {
            throw new Error('Missing or invalid address');
        }
        var addressBytes = base58_1.decode(this.address);
        if (addressBytes[0] !== constants.ADDRESS_VERSION || addressBytes[1] !== this.networkByte) {
            return false;
        }
        var key = addressBytes.slice(0, 22);
        var check = addressBytes.slice(22, 26);
        var keyHash = crypto_1.default.hash(key).slice(0, 4);
        for (var i = 0; i < 4; i++) {
            if (check[i] !== keyHash[i]) {
                return false;
            }
        }
        return true;
    }

    getSignature(transferData, txType) {
        return crypto_1.default.buildTransactionSignature(tx_1.default.toBytes(transferData, txType), this.privateKey);
    }

    publicKeyToAddress(publicKey) {
        var publicKeyBytes;
        if (typeof publicKey === 'string' || publicKey instanceof String) {
            publicKeyBytes = base58_1.decode(publicKey);
        } else {
            publicKeyBytes = publicKey;
        }
        if (!publicKeyBytes || publicKeyBytes.length !== constants.PUBLIC_KEY_BYTE_LENGTH || !(publicKeyBytes instanceof Uint8Array)) {
            throw new Error('Missing or invalid public key');
        }
        var prefix = Uint8Array.from([constants.ADDRESS_VERSION, this.networkByte]);
        var publicKeyHashPart = Uint8Array.from(crypto_1.default.hash(publicKeyBytes).slice(0, 20));
        var rawAddress = concat_1.concatUint8Arrays(prefix, publicKeyHashPart);
        var addressHash = Uint8Array.from(crypto_1.default.hash(rawAddress).slice(0, 4));
        return base58_1.encode(concat_1.concatUint8Arrays(rawAddress, addressHash));
    }
};
