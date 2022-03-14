`ht inspect`
============

Inspect resources in the current workspace

* [`ht inspect RESOURCE`](#ht-inspect-resource)

## `ht inspect RESOURCE`

Inspect resources in the current workspace

```
USAGE
  $ ht inspect [RESOURCE] -f <value>

ARGUMENTS
  RESOURCE  Resource ID

FLAGS
  -f, --format=<value>  (required) [default: json] Output format(yaml/json)

DESCRIPTION
  Inspect resources in the current workspace

EXAMPLES
  $ ht inspect model/run-user
```

_See code: [dist/commands/inspect.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/inspect.ts)_
