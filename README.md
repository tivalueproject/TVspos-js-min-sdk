# js-v-min-sdk
The simple JavaScript library for V Systems

## Install

  1. install node.js (homebrew or https://nodejs.org/)

  2. clone this project

``` bash
$ git clone https://github.com/virtualeconomy/js-v-min-sdk.git
```

  3. install packages

```bash
  $ cd js-v-min-sdk
  $ npm install
```

  4. build project and then you can use JS library for V Systems and Ledger Wallet

```bash
  $ npm run build
```

## Usage

### chain object
1. For testnet chain:

    ```javascript
    const Blockchain = require('../libs/blockchain');
    const constants = require("../libs/constants");
    const nodeAddress = "http://test.v.systems:9922"; // change to your node address
    var chain = new Blockchain(constants.TESTNET_BYTE, nodeAddress);
    ```

2. For mainnet chain:

    ```javascript
    const Blockchain = require('../libs/blockchain');
    const constants = require("../libs/constants");
    const nodeAddress = "https://wallet.v.systems/api"; // change to your node address
    var chain = new Blockchain(constants.MAINNET_BYTE, nodeAddress);
    ```
    
### address object
1. create account by seed

    ```javascript
    const Account = require('../libs/account');
    const constants = require("../libs/constants");
    var acc = new Account(constants.TESTNET_BYTE);
    acc.buildFromSeed("<your seed>", 0);
    ```

2. create account by keys and address

    ```javascript
    const Account = require('../libs/account');
    const constants = require("../libs/constants");
    var acc = new Account(constants.TESTNET_BYTE);
    acc.build("<privateKey>", "<publicKey>", "<address>");
    ```
    
### send transaction
1. Send Payment transaction

    ```javascript
    async function sendPaymentTx(chain, tx) {
        const result = await chain.sendPaymentTx(tx);
        console.log(result);
    }

    // Create Transaction Object (send 1 VSYS)
    var dataInfo = acc.buildPayment("<recipient address>", 1.0);
    dataInfo["signature"] = acc.getSignature(dataInfo, constants.PAYMENT_TX);
    console.log("Request:");
    console.log(JSON.stringify(dataInfo));

    // Send Transaction
    sendPaymentTx(chain, dataInfo);
    ```

2. Send Lease transaction

    ```javascript
    async function sendLeasingTx(chain, tx) {
        const result = await chain.sendLeasingTx(tx);
        console.log(result);
    }

    // Create Transaction Object (send 1 VSYS)
    var dataInfo = acc.buildLeasing(RECIPIENT_ADDR, 1.0);
    dataInfo["signature"] = acc.getSignature(dataInfo, constants.LEASE_TX);
    console.log("Request:");
    console.log(JSON.stringify(dataInfo));

    // Send Transaction
    sendLeasingTx(chain, dataInfo);
    ```

## Test

Run these commands as you want (you may need to change some parameters in test file).

```
# Test payment with ledger wallet
# Change SEED and RECIPIENT in "test/test-payment.js" for your test case
$ npm run payment

# Test leasing with ledger wallet
# Change SEED and RECIPIENT in "test/test-lease.js" for your test case
$ npm run lease

# Test cancel leasing with ledger wallet
# Change SEED and LEASE_TX_ID in "test/test-cancellease.js" for your test case
$ npm run cancel
```

Feel free to modify these test example files. Write your own code as wallet client and integrate into your project.
