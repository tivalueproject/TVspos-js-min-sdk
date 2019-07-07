"use strict";

import "babel-polyfill";
const fetch = require("node-fetch");

async function getRequest (host, path) {
    const url = host + path;
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, config)
    return await response.json();
}

async function postRequest (host, path, data) {
    const url = host + path;
    const jsonData = JSON.stringify(data).replace(/"amount":"(\d+)"/g, '"amount":$1') 
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: jsonData
    }
    const response = await fetch(url, config)
    return await response.json();
}

module.exports = class Blockchain {

    constructor(networkByte, nodeAddress) {
        this.networkByte = networkByte;
        this.nodeAddress = nodeAddress;
    }

    async sendPaymentTx(tx) {
        return await postRequest(this.nodeAddress, '/vsys/broadcast/payment', tx);
    }

    async sendLeasingTx(tx) {
        return await postRequest(this.nodeAddress, '/leasing/broadcast/lease', tx);
    }

    async sendCancelLeasingTx(tx) {
        return await postRequest(this.nodeAddress, '/leasing/broadcast/cancel', tx);
    }

    async getBalance(address) {
        return await getRequest(this.nodeAddress, '/addresses/balance/' + address);
    }

    async getTxHistory(address, num) {
        return await getRequest(this.nodeAddress, '/transactions/address/'+ address +'/limit/' + num);
    }

    async getTxById(txId) {
        return await getRequest(this.nodeAddress, '/transactions/info/'+ txId);
    }
};