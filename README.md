scdx
====

SFDX plugins designed for Smart Cloud consultants

[![Version](https://img.shields.io/npm/v/scdx.svg)](https://npmjs.org/package/scdx)
[![CircleCI](https://circleci.com/gh/dsl12/scdx/tree/master.svg?style=shield)](https://circleci.com/gh/dsl12/scdx/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/dsl12/scdx?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/scdx/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/dsl12/scdx.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dsl12/scdx/badge.svg)](https://snyk.io/test/github/dsl12/scdx)
[![Downloads/week](https://img.shields.io/npm/dw/scdx.svg)](https://npmjs.org/package/scdx)
[![License](https://img.shields.io/npm/l/scdx.svg)](https://github.com/dsl12/scdx/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g scdx
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
scdx/1.1.0 darwin-x64 node-v12.16.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx scdx:label:build [-r <string>] [-c <string>] [-l <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-scdxlabelbuild--r-string--c-string--l-string--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx scdx:label:convert [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-scdxlabelconvert--r-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx scdx:permSet:build [-p <string>] [-r <string>] [-c <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-scdxpermsetbuild--p-string--r-string--c-string--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx scdx:permSet:convert [-p <string>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-scdxpermsetconvert--p-string--r-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx scdx:profile:build [-p <string>] [-r <string>] [-c <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-scdxprofilebuild--p-string--r-string--c-string--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx scdx:profile:convert [-p <string>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-scdxprofileconvert--p-string--r-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx scdx:label:build [-r <string>] [-c <string>] [-l <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Convert label xml into small chunks of json files

```
USAGE
  $ sfdx scdx:label:build [-r <string>] [-c <string>] [-l <string>] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --components=components                                                       Path to file containing  seperated
                                                                                    paths to labels to be built into
                                                                                    label xml

  -l, --list=list                                                                   Text list of label names to include

  -o, --output=output                                                               Output path to write label xml to.

  -r, --sourcepath=sourcepath                                                       [default:
                                                                                    force-app/main/default/labels] Path
                                                                                    to label files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx scdx:label:build
  $ sfdx scdx:label:build  -r src/labels
```

_See code: [src/commands/scdx/label/build.ts](https://github.com/dsl12/scdx/blob/v1.1.0/src/commands/scdx/label/build.ts)_

## `sfdx scdx:label:convert [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Convert Label xml into small chunks of json files

```
USAGE
  $ sfdx scdx:label:convert [-r <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -r, --sourcepath=sourcepath                                                       [default: force-app/main/default/lab
                                                                                    els/CustomLabels] Path to label file

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx scdx:label:convert
  $ sfdx scdx:permissionset:convert -r src/labels
```

_See code: [src/commands/scdx/label/convert.ts](https://github.com/dsl12/scdx/blob/v1.1.0/src/commands/scdx/label/convert.ts)_

## `sfdx scdx:permSet:build [-p <string>] [-r <string>] [-c <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Builds small json files into a permission set xml

```
USAGE
  $ sfdx scdx:permSet:build [-p <string>] [-r <string>] [-c <string>] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --components=components                                                       Path to file containing  seperated
                                                                                    paths to components to be built into
                                                                                    Permission Set

  -o, --output=output                                                               Output path to write Permission Sets
                                                                                    to.

  -p, --psetname=psetname                                                           Permission Set name to be converted

  -r, --sourcepath=sourcepath                                                       [default: force-app/main/default/per
                                                                                    missionsets] Path to Permission Set
                                                                                    files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx scdx:PermissionSet:build
  $ sfdx scdx:PermissionSet:build -p SuperUser -r src/permissionsets
  $ sfdx scdx:PermissionSet:build -p SuperUser -r src/permissionsets -o outputDirectory/permission sets
  $ sfdx scdx:PermissionSet:build -p SuperUser -r src/permissionsets -c aFold/desiredComponents.txt
```

_See code: [src/commands/scdx/permSet/build.ts](https://github.com/dsl12/scdx/blob/v1.1.0/src/commands/scdx/permSet/build.ts)_

## `sfdx scdx:permSet:convert [-p <string>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Convert permissionset xml into small chunks of json files

```
USAGE
  $ sfdx scdx:permSet:convert [-p <string>] [-r <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --psetname=psetname                                                           Permission set name to be converted

  -r, --sourcepath=sourcepath                                                       [default: force-app/main/default/per
                                                                                    missionsets] Path to permission set
                                                                                    files files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx scdx:permissionset:convert
  $ sfdx scdx:permissionset:convert -p SuperUser -r src/permissionsets
```

_See code: [src/commands/scdx/permSet/convert.ts](https://github.com/dsl12/scdx/blob/v1.1.0/src/commands/scdx/permSet/convert.ts)_

## `sfdx scdx:profile:build [-p <string>] [-r <string>] [-c <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Builds into small chunks of json files into a profile xml

```
USAGE
  $ sfdx scdx:profile:build [-p <string>] [-r <string>] [-c <string>] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --components=components                                                       Path to file containing  seperated
                                                                                    paths to components to be built into
                                                                                    profile

  -o, --output=output                                                               Output path to write profiles to.

  -p, --profilename=profilename                                                     Profile name to be built

  -r, --sourcepath=sourcepath                                                       [default:
                                                                                    force-app/main/default/profiles]
                                                                                    Path to profile files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx scdx:profile:build
  $ sfdx scdx:profile:build -r src/profiles
  $ sfdx scdx:profile:build -p Admin -r src/profiles
  $ sfdx scdx:profile:build -p Admin -r src/profiles -o outputDirectory/profiles
  $ sfdx scdx:profile:build -p Admin -r src/profiles -o outputDirectory/profiles -c somePath/desiredComponents.txt
```

_See code: [src/commands/scdx/profile/build.ts](https://github.com/dsl12/scdx/blob/v1.1.0/src/commands/scdx/profile/build.ts)_

## `sfdx scdx:profile:convert [-p <string>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Convert profile xml into small chunks of json files

```
USAGE
  $ sfdx scdx:profile:convert [-p <string>] [-r <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --profilename=profilename                                                     Profile name to be converted

  -r, --sourcepath=sourcepath                                                       [default:
                                                                                    force-app/main/default/profiles]
                                                                                    Path to profile files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx scdx:profile:convert
  $ sfdx scdx:profile:convert -p Admin -r src/profiles
```

_See code: [src/commands/scdx/profile/convert.ts](https://github.com/dsl12/scdx/blob/v1.1.0/src/commands/scdx/profile/convert.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
