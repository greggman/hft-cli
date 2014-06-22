#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode

"use strict";

process.title = "hft";

var path = require('path');
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));
var hftConfig = require('../lib/hft-config');

var config = hftConfig.getConfig();
if (!config) {
  console.log("ERROR: happyFunTimes does not appear to be installed.")
  return;
}

var cmd = args._[0];
if (!cmd) {
  printUsage();
  process.exit(1);
} else {
  var cmdPath = path.join(__dirname, "../lib/cmds", cmd + ".js");
  if (!fs.existsSync(cmdPath)) {
    console.error("unknown cmd: " + cmd);
    printUsage();
    process.exit(1);
  }
  var cmdModule = require('../lib/cmds/' + cmd);
  cmdModule.cmd(args);
}

function printUsage() {
  var usage = [];
  var cmds = fs.readdirSync(path.join(__dirname, "../lib/cmds"));
  cmds.forEach(function(cmd) {
    if (cmd.substr(-3) != ".js") {
      return;
    }

    var cmdUsage = require('../lib/cmds/' + cmd).usage;
    usage.push(cmd.substring(0, cmd.length - 3) + ":\n    " + cmdUsage.split("\n").join("\n    ") + "\n");
  });
  console.log("usage: hft cmd [options]\n\n" + usage.join("\n"));
};


}());

