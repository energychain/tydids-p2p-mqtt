#!/usr/bin/env node

const lib = require("./lib.js");

const fs = require("fs");

const { program } = require('commander');

program
  .option('-priv --privateKey <key>')
  .option('-n --influxHost <hostname>')
  .option('-p --presentation [address]')
  .option('-P --influxPort <port>')
  .option('-d --influxDatabase <name>')
  .option('-m --influxMeasurement <name>')
  .option('-q --query <influxQuery>')
  .option('-t --represent <MilliSeconds>')
  .option('--createPrivateKey')

program.parse();

const options = program.opts();
const args = program.args;

let privateKey = null;
if(typeof options.privateKey !== 'undefined') { privateKey = options.privateKey};
if(typeof options.influxHost == 'undefined') options.influxHost = "localhost";
if(typeof options.influxPort == 'undefined') options.influxPort = 8086;
if(typeof options.influxDatabase == 'undefined') options.influxDatabase = 'tydids';
if(typeof options.represent == 'undefined') options.represent = 60000;

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
      measurement:options.influxMeasurement,
      presentation:options.presentation,
      query:options.query,
      represent:options.represent
    },{
      host: options.influxHost,
      database: options.influxDatabase,
      port: options.influxPort * 1
    });
}

app();
