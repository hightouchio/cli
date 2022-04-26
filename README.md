# Hightouch CLI

Hightouch CLI to list, inspect resources and trigger syncs

[![CircleCI](https://circleci.com/gh/hightouchio/cli/tree/main.svg?style=shield)](https://circleci.com/gh/hightouchio/cli/tree/main)

## Demo

[![asciicast](https://asciinema.org/a/kFXceRxY6hPTlCz4YeRHv6hGt.svg)](https://asciinema.org/a/kFXceRxY6hPTlCz4YeRHv6hGt)

## Quick Start

1. To install cli from curl script, run 

```shell
curl -sLf https://raw.githubusercontent.com/hightouchio/cli/main/install.sh | sh -
```

To install from Github package, download the latest release from [here](https://github.com/hightouchio/cli/releases).

2. Create an API key. Follow docs [here](https://hightouch.io/docs/integrations/api/#authorization).

3. Login CLI with API key.

```shell
$ ht login
Hightouch API key [************************************]:
```

Note: you can override api key with this environment variable `HIGHTOUCH_APIKEY=mykey`.

4. Hightouch CLI is ready to use!

<!-- usagestop -->
<!-- commands -->
* [`ht destinations`](#ht-destinations)
* [`ht inspect RESOURCE`](#ht-inspect-resource)
* [`ht login`](#ht-login)
* [`ht models`](#ht-models)
* [`ht runs`](#ht-runs)
* [`ht sources`](#ht-sources)
* [`ht syncs`](#ht-syncs)
* [`ht trigger SYNC`](#ht-trigger-sync)

## `ht destinations`

List all destinations in current workspace

```
USAGE
  $ ht destinations

DESCRIPTION
  List all destinations in current workspace

ALIASES
  $ ht destination

EXAMPLES
  $ ht destinations
```

_See code: [dist/commands/destinations.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/destinations.ts)_

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

_See code: [dist/commands/inspect.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/inspect.ts)_

## `ht login`

Login hightouch with api key

```
USAGE
  $ ht login

DESCRIPTION
  Login hightouch with api key

EXAMPLES
  $ ht login
```

_See code: [dist/commands/login.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/login.ts)_

## `ht models`

List all models in current workspace

```
USAGE
  $ ht models

DESCRIPTION
  List all models in current workspace

ALIASES
  $ ht model

EXAMPLES
  $ ht models
```

_See code: [dist/commands/models.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/models.ts)_

## `ht runs`

List all syncs run for a given sync

```
USAGE
  $ ht runs -s <value> [-l <value>]

FLAGS
  -l, --limit=<value>  [default: 5] Limit the number of runs to output
  -s, --sync=<value>   (required) Specify sync name to list runs

DESCRIPTION
  List all syncs run for a given sync

ALIASES
  $ ht run

EXAMPLES
  $ ht runs
```

_See code: [dist/commands/runs.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/runs.ts)_

## `ht sources`

List all sources in current workspace

```
USAGE
  $ ht sources

DESCRIPTION
  List all sources in current workspace

ALIASES
  $ ht source

EXAMPLES
  $ ht sources
```

_See code: [dist/commands/sources.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/sources.ts)_

## `ht syncs`

List all syncs in current workspace

```
USAGE
  $ ht syncs

DESCRIPTION
  List all syncs in current workspace

ALIASES
  $ ht sync

EXAMPLES
  $ ht syncs
```

_See code: [dist/commands/syncs.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/syncs.ts)_

## `ht trigger SYNC`

Trigger sync to run

```
USAGE
  $ ht trigger [SYNC] [-f] [-q]

ARGUMENTS
  SYNC  Sync ID

FLAGS
  -f, --full-sync  Whether to run a full sync
  -q, --quiet      Whether to show run progress

DESCRIPTION
  Trigger sync to run

EXAMPLES
  $ ht trigger --sync test123
```

_See code: [dist/commands/trigger.ts](https://github.com/hightouchio/cli/blob/v0.1.0/dist/commands/trigger.ts)_
<!-- commandsstop -->

## Local Development

Hightouch cli is written in typescripts. To test or develop in local development:

1. Install latest [LTS](https://nodejs.org/en/download/) nodejs.

2. Run
```shell
$ ./script/dev
```

## License

Copyright [2022] [Carry Technologies, Inc. dba Hightouch](https://hightouch.io/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
