`ht sync-run`
=============

List all syncs in current workspace

* [`ht sync-run`](#ht-sync-run)

## `ht sync-run`

List all syncs in current workspace

```
USAGE
  $ ht sync-run -s <value> [-l <value>]

FLAGS
  -l, --limit=<value>  [default: 5] Limit the number of runs to output
  -s, --sync=<value>   (required) Specify sync name to list runs

DESCRIPTION
  List all syncs in current workspace

ALIASES
  $ ht sync-runs

EXAMPLES
  $ ht sync
```

_See code: [dist/commands/sync-run.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/sync-run.ts)_
