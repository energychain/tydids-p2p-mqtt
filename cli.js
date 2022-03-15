#!/usr/bin/env node

const lib = require("./lib.js");

const fs = require("fs");

const { program } = require('commander');

program
  .option('-priv --privateKey <key>')
  .option('-n --mqttBroker <url>')
  .option('-p --presentation [address]')
  .option('-t --topic <topic>')
  .option('-i --identity <address>')
  .option('--createPrivateKey')

program.parse();

const options = program.opts();
const args = program.args;

let privateKey = null;
if(typeof options.privateKey !== 'undefined') { privateKey = options.privateKey};
if(typeof options.mqttBroker == 'undefined') options.mqttBroker = "mqtt://localhost/";
if(typeof options.topic == 'undefined') options.topic = "/tydids";

if(typeof options.createPrivateKey !== 'undefined') {
  let wallet = lib.ethers.Wallet.createRandom();
  console.log(wallet.privateKey);
  openApp = false;

  let obj = {
    privateKey: wallet.privateKey,
    address:wallet.address
  };
  fs.writeFileSync("./.tydids.json",JSON.stringify(obj));

}


if(fs.existsSync('./.tydids.json')) {
	let settings = JSON.parse(fs.readFileSync('./.tydids.json'));
	if(typeof settings.privateKey !== 'undefined') {
    options["privateKey"] = settings.privateKey;
  }
  if(typeof settings.defaultDID !== 'undefined') {
    if(typeof options.presentation == 'undefined') {
      options.presentation = settings.defaultDID;
    }
  }
}

const app = async function() {
    lib.run({
      privateKey:options.privateKey,
      presentation:options.presentation,
      identity:options.identity
    },{
      broker: options.mqttBroker,
      topic: options.topic
    });
}

app();
