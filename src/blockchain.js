"use strict";

import "babel-polyfill";
const fetch = require("node-fetch");

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
    return response;
}

exports.Blockchain = {

    sendPaymentTx: async function (host, tx) {
        return await postRequest(host, '/vsys/broadcast/payment', tx);
    },

    sendLeasingTx: async function (host, tx) {
        return await postRequest(host, '/leasing/broadcast/lease', tx);
    },

    sendCancelLeasingTx: async function (host, tx) {
        return await postRequest(host, '/leasing/broadcast/cancel', tx);
    },


};