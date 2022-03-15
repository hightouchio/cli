`ht trigger`
============

Trigger sync to run

* [`ht trigger SYNC`](#ht-trigger-sync)

## `ht trigger SYNC`

Trigger sync to run

```
USAGE
  $ ht trigger [SYNC] [-f] [-q]

ARGUMENTS
  SYNC  Sync ID

FLAGS
  -f, --fullSync  Whether to run a full sync
  -q, --quiet     Whether to show run progress

DESCRIPTION
  Trigger sync to run

EXAMPLES
  $ ht trigger --sync test123
```

_See code: [dist/commands/trigger.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/trigger.ts)_
