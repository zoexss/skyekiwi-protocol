<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gqz4uri7ckj33dl0otn1c.jpg" width="600px"/>

**NOTE:** This is a very early version of the SkyeKiwi Protocol. It is in heavy development. We will not advise anyone to use in production environment yet.


> **A fun background story behind our logo** <br/><br/>
> Little do people know that among all Greek letters, Sigma is a special one. Not only because it’s the Greek for S and S for  SkyeKiwi(duh..), but also because it’s the only Greek letter that can be written in three ways: uppercase “Σ”, lowercase “σ” and lowercase in word-final position “ς” and English likely adopt “ς” as “S” (they do look alike, right?). We make our logo to honor the Greeks’ letter Sigma but intentionally leave out the “ς” ( at a word-final position :) ), to keep this a secret (Shhhh... ). To read more on this fun Greek fact. [Link](https://en.wikipedia.org/wiki/Sigma)


## Introduction

SkyeKiwi Protocol is a decentralized secret sharing protocol. It enables anyone to share a file of arbitrary size to an arbitrary number of people with ease. 


![skyekiwi (6)](https://tva1.sinaimg.cn/large/008i3skNgy1gqz4x7dy5sj31ip0r0q4k.jpg)
<br/><br/>
## Installation & Testing

<details><summary>Full Environment Setup</summary>

<p>
  
### Install Node.js

please reference to [Node.js Website](https://nodejs.org/en/download/) 

- We recommend you to install [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) as an alternative to `npm` . Simple run `npm install --global yarn` 

- The repo is tested with nodejs version `14.6.0` , to check on your nodejs version `node -v` , to switch version of node, I recommend using [n](https://github.com/tj/n) by TJ. 

    

### Setup the Substrate smart contract development environment

A good general guide to setup the environment for Substrate environment can be founded [here](https://substrate.dev/docs/en/knowledgebase/getting-started/). 

1. Install Rust for help: refer to [Rust Website](https://www.rust-lang.org/tools/install)

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env
    ```

    Check your installed version
    ```bash
    rustc --version
    cargo --version
    ```
    This guides is tested with `rustc 1.50.0 (cb75ad5db 2021-02-10)` and `cargo 1.50.0 (f04e7fab7 2021-02-04)`

2. Install [Binaryen](https://github.com/WebAssembly/binaryen). You can simply install with [Homebrew](https://brew.sh/) on macOS

    ```bash
    brew install binaryen
    ```

    To install `Homebrew` use

    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

3. Install [cargo-contract](https://github.com/paritytech/cargo-contract) 

    ```bash
    cargo install --force cargo-contract
    ```


4. Grab a local Substrate blockchain node with `pallet-contract` included. There are many options: [jupiter](https://github.com/patractlabs/jupiter) is the one we choose. Alternatively, you can get [canvas](https://github.com/paritytech/canvas-node) by Parity. `Rust` is known for compiling slowly. It took me an hour to compile [jupiter](https://github.com/patractlabs/jupiter). 

    - To use [jupiter](https://github.com/patractlabs/jupiter), follow this [guide](https://github.com/patractlabs/jupiter#compile-and-run).  

    - To use [canvas](https://github.com/paritytech/canvas-node), follow this [guide](https://substrate.dev/substrate-contracts-workshop/#/0/setup?id=installing-the-canvas-node). 
    
    - Lastly, fire up the local blockchain 

        ```
        path-to-jupiter-repo/target/release/jupiter-prep --dev
        # OR with Canvas
        canvas --dev --tmp
        ```

        You can visit https://ipfs.io/ipns/dotapps.io and choose to connect to `ws://127.0.0.1:9944` to have a visual portal to interact with the blockchain. </p></details>

<details><summary>My Environment</summary>

<p>

#### Versions 

Codes are tested with the following environment:

`binaryen`: `version 101` <br/>
`cargo`: `cargo 1.51.0 (43b129a20 2021-03-16)` <br/>
`cargo-contract`:  `cargo-contract 0.10.0` <br/>
`node`: `v14.16.0` <br/>
`rust`: `rustc 1.51.0 (2fd73fabe 2021-03-23)` <br/><br/>
`canvas`: `canvas 0.1.0-385c4cc-x86_64-macos` <br/>
`OS Version`: `macOS Big Sur 11.0.1` <br/>

`ts-node`: `v10.0.0` <br/>
`mocha`: `8.4.0` <br/>

**Node Packages**
Please refer to the `package.json`

</p></details>

### Run & test the core library 

1. Clone this repo to your local environment & install dependencies 

```bash
git clone git@github.com:skyekiwi/skyekiwi-protocol.git
yarn
```

2. Install global dependencies

```bash
yarn global add mocha
yarn global add ts-node
```

2. Create `.env`  files at the project home directory and write your seed phrase to it

```
SEED_PHRASE = 'xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx'
```

3. Get some test-net tokens to interact with the blockchain. By default, SkyeKiwi uses the [Jupiter Network](https://github.com/patractlabs/jupiter/) for smart contract runtime and [Crust Network - Rocky Testnet](https://wiki.crust.network/docs/en/buildRockyGuidance) for storage.

- Faucet on the Jupiter network is available at [LINK](https://patrastore.io/#/jupiter-a1/system/accounts)
- Faucet on the Crust Network - Rocky Testnet is available at [LINK](https://github.com/decloudf/faucet-bot/issues)

4. Run Tests. The process can take somewhere between 3minutes to 10 minutes, depends on network connection. 

```bash
yarn test
```

5. Relax. After a few minutes. It should produce something similar as:

```
$ yarn test:all
$ mocha -r ts-node/register ./spec/*.test.ts

  Blockchain
    ✓ Blockchain: send contract tx & storage order works (33919ms)

  Encryption
    ✓ Symmetric: Encryption & Decryption Works
    ✓ Asymmetric: Encryption & Decryption Works
    ✓ Symmetric: Decryption Fails w/Wrong Key
    ✓ Asymmetric: Decryption Fails w/Wrong Key
    ✓ TSS: Sharing Works

  File
    ✓ File: file size reads well
    ✓ File: file chunk count calculated correctly
    ✓ File: chunk hash calculation works (44ms)
    ✓ File: inflate & deflat work (147ms)

  Integration
    ✓ upstream, author only (59532ms)
    ✓ downstream, author only (31919ms)
    ✓ upstream, two members + author (69974ms)
    ✓ downstream, two members + author (33960ms)
    ✓ update encryptionSchema & downstream again (40926ms)

  IPFS Client
    ✓ ipfs works (65381ms)

  Metadata
    ✓ Seal: sealing & recover works
    ✓ Chunks: chunks are recorded well & CID list matches (16470ms)


  18 passing (6m)

```

### Run & test the sample smart contract
The repository comes with a pre-compiled version of the smart contract included and a deployed version of it on the Jupiter testnet @ `3cNizgEgkjB8TKm8FGJD3mtcxNTwBRxWrCwa77rNTq3WaZsM`

1. Navigate to the `contract` directory, and use `yarn` to install dependencies.
2. Fire up a local smart contract enabled blockchain. Please refer to the `Full Environment Setup` section. 
```
path-to-jupiter-repo/target/release/jupiter-prep --dev
# OR with Canvas
canvas --dev --tmp
```
3. Create a `.env` file with your seed phrase under the `skyekiwi-protocol/contract` directory
```
SEED_PHRASE = 'xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx'
```
4. Transfer to your account some gas fee. Go to a [Substrate App](https://ipfs.io/ipns/dotapps.io/#/accounts) to interact with the your local blockchain.
5. Run the test by `yarn test`. The process might take about 10 minutes. `Rust` is notoriously known to be slow in compiling.

### Usage

Please refer to the `spec/integration.test.ts` folder which contains test cases for common useage.

```javascript
const skyekiwi = new SkyeKiwi.Driver(
  encryptionSchema, // a SkyeKiwi.encryptionSchema instance - specify 
  fileHandle, // a SkyeKiwi.File instance - specify which file to upload
  key, // a SkyeKiwi.Seal instance - specify keys used
  ipfs // a SkyeKiwi.ipfs instance - specify which IPFS to be used 
)

skyekiwi.upstream() // upstream the file, it take two major actions: 
// upload files to the Crust Network & Write to a smart contract to generate a vaultId 
```

```javascript
await SkyeKiwi.Driver.downstream(
  vaultId, // the file id from the smart contract
  blockchain, // SkyeKiwi.Blockchain instance
  ipfs,
  downstreamPath, // where to keep the recorvered file 
  [privateKey1, privateKey2] // keys used to decrypt 
)
// upon finishing, the file will be download and recovered to the destination path
```


```javascript
await SkyeKiwi.Driver.updateEncryptionSchema(
  vaultId, // vaultId from the smart contract
  encryptionSchema, // the new encryptionSchema
  mnemonic, // blockchain seed phrase
  [mnemonicToMiniSecret(mnemonic)],  // an array of keys used to decrypt the seal
  ipfs,  
  blockchain
)
// upon finishing, the encryptionSchema will be updated
```

### IPFS Pin Service

By default, we use two IPFS remote pin service before the Crust Network is able to fetch the files. 

- Decoo: https://decoo.io/
Signup and get an API key, save it to the `.env` as `DECOO = 'xxxx'`

- Infura: https://infura.io/docs/ipfs
You don't need to do anything with this, they are offering IPFS pinning without authorization for now. However, pinning to Infura might fail sometimes. 

When pushing content to IPFS, the IPFS module of the SkyeKiwi Protocol will try to push content to Decoo, if the HTTP request fails, or if you do not record an Decoo API key in the `.env` file, it will fall back to Infura IPFS. If Infura IPFS fails again, it will fallback to start a local IPFS node, in that case, you will be required to keep the local IPFS node running, so that the Crust Network can fetch the file. It might take up to 2 hours for the Crust Network to pick up the file. Please refer to [Crust Wiki](https://wiki.crust.network/docs/en/storageUserGuide) for file fetching. 

Similarly, for `ipfs.cat`, it will try to use an Infura ipfs gateway first, if failed, it will fall back to a local node. 

If an `ERR_LOCK_EXISTS` appears on `jsipfs`, it is because that you are trying to start another local IPFS node when there is already one running. Run `await ipfs.stopIfRunning()` to stop the local IPFS node. `stopIfRunning` will always do checks and if there is actually a local node running, if not, it will not do anything. Therefore, if a local IPFS node is not needed, always run `await ipfs.stopIfRunning()`. 

### Project Structure 
```
.
├── LICENSE
├── README.md
├── contract // a sample smart contract
│   ├── LICENSE.txt 
│   ├── artifacts // compiled smart contract
│   │   ├── skyekiwi.contract 
│   │   └── skyekiwi.json
│   ├── contracts // smart contract source files
│   │   ├── Cargo.lock
│   │   ├── Cargo.toml
│   │   └── lib.rs
│   ├── package.json
│   ├── redspot.config.ts // redspot configuration see https://github.com/patractlabs/redspot
│   ├── scripts
│   │   └── deploy.ts // script used to deploy to the Jupiter testnet
│   ├── tests // smart contract testing
│   │   └── skyekiwi.test.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── package.json
├── spec // testing for the main protocol
│   ├── integration.test.ts 
│   ├── tmp // temp folder for generated test file, if testing throws an error, try remove all files within this folder and restart
│   └── unit.test.ts
├── src 
│   ├── Blockchain // Blockchain Adapter 
│   │   ├── Contract.ts 
│   │   ├── Crust.ts
│   │   ├── index.ts
│   │   └── sendTx.ts // helper function to send transactions, Credit: Crust Network
│   ├── Encryption
│   │   ├── Box.ts // public-key encryption
│   │   ├── SecretBox.ts // symmetric encryption
│   │   ├── TSS.ts // threshold secret sharing 
│   │   └── index.ts
│   ├── File // file handler
│   │   └── index.ts
│   ├── IPFS // ipfs client wrapper
│   │   └── index.ts
│   ├── Metadata // the heavy lifting Metadata handler
│   │   ├── Chunks.ts // process all generated chunks, not encypted
│   │   ├── EncryptionSchema.ts // normalized EncryptionSchema 
│   │   ├── Seal.ts // encryption handler
│   │   └── index.ts // main Metadata instance 
│   ├── Util
│   │   └── index.ts
│   ├── driver.ts // entry point that wraps all functions with three main APIs: upstream, downstream & updateEncryptionSchema
│   ├── index.ts
│   └── types.ts
├── tsconfig.json
├── tslint.json
└── yarn.lock
```


### LICENSE

Apache 2.0. See the `LICNESE` File. 

### Contact 
Email: hello@skye.kiwi <br/>
Telegram: @songzhou26
