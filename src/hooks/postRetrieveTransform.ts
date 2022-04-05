// import { readFileSync, writeFileSync } from 'fs';
// import { Builder, parseStringPromise } from 'xml2js';
import * as fs from 'fs';
import { Command, Hook } from '@oclif/config';
import { FileResponse } from '@salesforce/source-deploy-retrieve';
import { convertLabels } from '../commands/scdx/label/convert';
import { cleanPackage } from '../commands/scdx/installedPackage/clean';
import { convertProfile } from '../commands/scdx/profile/convert';
import { convertPermissionSet } from '../commands/scdx/permSet/convert';
type HookFunction = (this: Hook.Context, options: HookOptions) => any;

type HookOptions = {
  Command: Command.Class;
  argv: string[];
  commandId: string;
  result?: FileResponse[];
};

export const hook: HookFunction = async function (options) {
  const action = 'postRetrieveTransform';
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
  let runHookOverall1 = true;
  let runHookOverall = false;
  if (runHookOverall && runHookOverall1) {
    // return;
  } else {
    return;
  }
  if (!options.result) {
    return;
  } else {
    const aResult = options.result[0];
    let filePath = aResult.filePath;
    if (filePath.includes('force-app')) {
      filePath = filePath.substring(0, filePath.indexOf('force-app'));
      if (fs.existsSync(filePath + 'config')) {
        filePath = filePath + 'config' + '/.hooks.json';
        if (fs.existsSync(filePath)) {
          let raw = fs.readFileSync(filePath, 'utf-8');
          runHooks = JSON.parse(raw);
        } else {
          fs.writeFileSync(filePath, JSON.stringify(runHooks));
        }
      }
    }
  }

  const currentScript = runHooks[action];

  for (let p in currentScript) {
    if (currentScript[p] === true) {
      runHookOverall = true;
      break;
    }
  }

  if (runHookOverall === true) {
    for (const f of options.result) {
      if (f.type == 'CustomLabels' && currentScript[f.type] === true) {
        let fPath = f.filePath;
        fPath = f.filePath.substring(0, f.filePath.lastIndexOf('/'));
        convertLabels(fPath);
      } else if (f.type == 'Profile' && currentScript[f.type] === true) {
        const sourcePath = f.filePath.substring(0, f.filePath.lastIndexOf('/'));
        convertProfile(sourcePath, f.fullName);
      } else if (f.type == 'PermissionSet' && currentScript[f.type] === true) {
        const sourcePath = f.filePath.substring(0, f.filePath.lastIndexOf('/'));
        convertPermissionSet(sourcePath, f.fullName);
      } else if (f.type == 'InstalledPackage') {
        cleanPackage(f.filePath);
      }
    }
  }
};
