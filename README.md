oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ht
$ ht COMMAND
running command...
$ ht (--version)
ht/0.1.0 darwin-x64 node-v16.13.1
$ ht --help [COMMAND]
USAGE
  $ ht COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ht destination`](#ht-destination)
* [`ht help [COMMAND]`](#ht-help-command)
* [`ht inspect RESOURCE`](#ht-inspect-resource)
* [`ht login`](#ht-login)
* [`ht model`](#ht-model)
* [`ht plugins`](#ht-plugins)
* [`ht plugins:inspect PLUGIN...`](#ht-pluginsinspect-plugin)
* [`ht plugins:install PLUGIN...`](#ht-pluginsinstall-plugin)
* [`ht plugins:link PLUGIN`](#ht-pluginslink-plugin)
* [`ht plugins:uninstall PLUGIN...`](#ht-pluginsuninstall-plugin)
* [`ht plugins:update`](#ht-pluginsupdate)
* [`ht source`](#ht-source)
* [`ht sync`](#ht-sync)
* [`ht sync-run`](#ht-sync-run)
* [`ht trigger SYNC`](#ht-trigger-sync)

## `ht destination`

List all destinations in current workspace

```
USAGE
  $ ht destination

DESCRIPTION
  List all destinations in current workspace

ALIASES
  $ ht destinations

EXAMPLES
  $ ht destination
```

_See code: [dist/commands/destination.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/destination.ts)_

## `ht help [COMMAND]`

Display help for ht.

```
USAGE
  $ ht help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ht.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

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

_See code: [dist/commands/login.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/login.ts)_

## `ht model`

List all models in current workspace

```
USAGE
  $ ht model

DESCRIPTION
  List all models in current workspace

ALIASES
  $ ht models

EXAMPLES
  $ ht model
```

_See code: [dist/commands/model.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/model.ts)_

## `ht plugins`

List installed plugins.

```
USAGE
  $ ht plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ht plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `ht plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ht plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ht plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/inspect.ts)_

## `ht plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ht plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ ht plugins:add

EXAMPLES
  $ ht plugins:install myplugin 

  $ ht plugins:install https://github.com/someuser/someplugin

  $ ht plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/install.ts)_

## `ht plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ht plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ ht plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/link.ts)_

## `ht plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ht plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ht plugins:unlink
  $ ht plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/uninstall.ts)_

## `ht plugins:update`

Update installed plugins.

```
USAGE
  $ ht plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/update.ts)_

## `ht source`

List all sources in current workspace

```
USAGE
  $ ht source

DESCRIPTION
  List all sources in current workspace

ALIASES
  $ ht sources

EXAMPLES
  $ ht source
```

_See code: [dist/commands/source.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/source.ts)_

## `ht sync`

List all syncs in current workspace

```
USAGE
  $ ht sync

DESCRIPTION
  List all syncs in current workspace

ALIASES
  $ ht syncs

EXAMPLES
  $ ht sync
```

_See code: [dist/commands/sync.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/sync.ts)_

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

## `ht trigger SYNC`

Trigger sync to run

```
USAGE
  $ ht trigger [SYNC] [-f] [-p]

ARGUMENTS
  SYNC  Sync ID

FLAGS
  -f, --fullSync  Whether to run a full sync
  -p, --progress  Whether to show run progress

DESCRIPTION
  Trigger sync to run

EXAMPLES
  $ ht trigger --sync test123
```

_See code: [dist/commands/trigger.ts](https://github.com/StrongMonkey/cli/blob/v0.1.0/dist/commands/trigger.ts)_
<!-- commandsstop -->
