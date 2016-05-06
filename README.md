# node-modules-alias-loader-bug

Demonstrates that any loader configured to accept sources from `node_modules` causes symlinked (i.e., `npm link`ed) libraries to be included multiple times, despite the `alias` setting.

## usage

```
cd child
npm install
cd ../parent
npm install
npm start
```

It prints out the number of times left-pad was included in the output bundle.

The `child` project (which is already symlinked into `parent`) is mimicks an `npm link`ed dependency like one would see while doing development across repos.

## the bug

Notice that there's an alias setting for `left-pad`. The expected behavior here would be for this to take precendence over everything, but the observed behavior is that we get two copies -- once for the import in `parent`, and another from `child` via it's import from `parent`.

Commenting out `noop-loader` in the config and rerunning `npm start` yields only a single copy. To verify that this is indeed because of the loaders, you can comment out both it the `alias` config, which will cause there to be two instances again. I've also included configuration for `source-map-loader` to demonstrate that it's not a bug in `noop-loader` (though `noop-loader` itself is a trivial pass-through implementation).

The `alias` command is respected insofar as the particular _version_ that ends up multiply-included is the one specified by `alias`. You can verify this by mangling `parent`'s instance of `left-pad`, then seeing that you get two identical manglings in the output bundle.

## bonus bug

Furthermore, it looks like `npm link`ed repos must have their own installations of any relevant loaders for it to work, which is unexpected. Try the following:

```
cd child
npm uninstall noop-loader
cd ../parent
npm start
```

Which will fail, complaining that it can't find `noop-loader` in `child`.
