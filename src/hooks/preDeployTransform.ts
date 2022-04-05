// import { readFileSync, writeFileSync } from 'fs';
// import { Builder, parseStringPromise } from 'xml2js';
import * as fs from 'fs';
import { Command, Hook } from '@oclif/config';
import { SourceComponent } from '@salesforce/source-deploy-retrieve';
import { buildLabels } from '../commands/scdx/label/build';
import { buildProfile } from '../commands/scdx/profile/build';
import { buildPermissionSet } from '../commands/scdx/permSet/build';

type HookFunction = (this: Hook.Context, options: HookOptions) => any;

type HookOptions = {
  Command: Command.Class;
  argv: string[];
  commandId: string;
  result?: SourceComponent[];
};

export const hook: HookFunction = async function (options) {
  const action = 'preDeployTransform';
  let runHooks = {
    preDeployTransform: {
      Profile: true,
      permissionsets: true,
      CustomLabels: true,
    },
    postRetrieveTransform: {
      Profile: true,
      PermissionSet: true,
      CustomLabels: true,
    },
  };
  let runHookOverall = false;
  let runHookOverall1 = true;
  if (runHookOverall && runHookOverall1) {
    // return;
  } else {
    return;
  }
  if (!options.result || options.result.length == 0) {
    return;
  } else {
    const aResult = options.result[0];
    let filePath = aResult.xml;
    if (filePath.includes('force-app')) {
      filePath = filePath.substring(0, filePath.indexOf('force-app'));
      if (fs.existsSync(filePath + 'config')) {
        filePath = filePath + 'config' + '/.hooks.json';
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, 'utf-8');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          runHooks = JSON.parse(raw);
        } else {
          fs.writeFileSync(filePath, JSON.stringify(runHooks, null, 2));
        }
      }
    }
  }

  const currentScript = runHooks[action];

  for (const p in currentScript) {
    if (currentScript[p] === true) {
      runHookOverall = true;
      break;
    }
  }

  if (runHookOverall === true) {
    for (const res of options.result) {
      if (res.type.name == 'CustomLabels' && currentScript[res.type.name] === true) {
        buildLabels(res.xml.substring(0, res.xml.lastIndexOf('/')));
      } else if (res.type.name == 'Profile' && currentScript[res.type.name] === true) {
        buildProfile(res.xml.substring(0, res.xml.lastIndexOf('/')), res.name);
      } else if (res.type.name == 'PermissionSet' && currentScript[res.type.name] === true) {
        buildPermissionSet(res.xml.substring(0, res.xml.lastIndexOf('/')), res.name);
      }
    }
  }
};
