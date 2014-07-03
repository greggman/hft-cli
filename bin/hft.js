#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode

"use strict";

process.title = "hft";

var path = require('path');
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));
var hftConfig = require('../lib/hft-config');

hftConfig.setup({
  configPath: args.config,
  hftDir: args["hft-dir"],
});
if (!hftConfig.check()) {
  console.log("ERROR: happyFunTimes does not appear to be installed.")
  return;
}

hftConfig.hftRequire('cli/hft');

}());

