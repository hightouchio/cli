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
# Command Topics

* [`ht destinations`](docs/destinations.md) - List all destinations in current workspace
* [`ht inspect`](docs/inspect.md) - Inspect resources in the current workspace
* [`ht login`](docs/login.md) - Login hightouch with api key
* [`ht models`](docs/models.md) - List all models in current workspace
* [`ht runs`](docs/runs.md) - List all syncs run for a given sync
* [`ht sources`](docs/sources.md) - List all sources in current workspace
* [`ht syncs`](docs/syncs.md) - List all syncs in current workspace
* [`ht trigger`](docs/trigger.md) - Trigger sync to run

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
