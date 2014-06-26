HFT-CLI Notes
=============

Commands are added to lib/cmds and are then instantlly available. For example if you add a file
`lib/cmds/foo.js` then

    hft foo args

Will call the cmd exported by foo as in

    // lib/cmds/foo.js

    exports.cmd = function(args) {
      console.log("I pitty the foo!");
    };

The args passed to a command were parsed with [`minimist`](https://www.npmjs.org/package/minimist) so
arguments in the form `--somearg=value` will appear on `args` as `args.somearg`. Regular arguments
are on the `_` property as in.

    exports.cmd = function(args) {
      console.log("args: " + args._.join(" ")); // show the args
    };

`args._.[0]` is the command so the first argument is `args._.[1]`.

Commands can return `false` if there was an error. If they return anything else, including
returning nothing at all, they are assumed to have succeeded.

Commands are also expected to define a usage string as in

    exports.usage = [
      "args",
      "",
      "description",
      "",
      "options",
    ].join("\n");

The first line is appended to the command when showing usage so `"args"` will get shown as

    hft foo args

When parsing your arguments if you find some argument are missing or wrong call `badArgs` as in

    var utils = require('../utils');

    exports.cmd = function(args) {
      if (args._.length < 2) {
         utils.badArgs("missing filename or whatever", module);
      }
      console.log("args: " + args._.join(" ")); // show the args
    };

`badArgs` does not return.

