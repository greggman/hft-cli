/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

var path = require('path');
var utils = require('../utils');
var hftRequire = require('../hft-config').hftRequire;
var release = hftRequire('management/release');

var install = function(args) {
  if (args._.length < 2) {
    utils.badArgs("missing srcPath", module);
  }

  if (args._.length > 2) {
    utils.badArgs("too many arguments", module);
  }

  var options = {
    dryRun: args['dry-run'],
    verbose: args['verbose'],
  };

  var srcPath = path.resolve(args._[1]);

  release.install(srcPath, args.dst, options);
};

exports.usage = [
  "srcpath",
  "",
  "install installs a zip package. Example:",
  "",
  "   hft install path/to/somegame.zip",
  "",
  "options:",
  "",
  "    --dst=dstpath: path to install to. If not supplied will be installed to default games folder.",
  "    --verbose    : print more stuff",
  "    --dry-run    : don't write any files"
].join("\n");
exports.cmd = install;


