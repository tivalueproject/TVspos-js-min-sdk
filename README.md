# vsystems-ledger-js
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