
// import { readFileSync, writeFileSync } from 'fs';
// import { Builder, parseStringPromise } from 'xml2js';
import { Command, Hook } from '@oclif/config';
import { FileResponse } from '@salesforce/source-deploy-retrieve';
import {convertLabels} from "../commands/scdx/label/convert"
import {convertProfile} from "../commands/scdx/profile/convert"
import {convertPermissionSet} from "../commands/scdx/permSet/convert"
type HookFunction = (this: Hook.Context, options: HookOptions) => any;

type HookOptions = {
  Command: Command.Class;
  argv: string[];
  commandId: string;
  result?: FileResponse[];
};

export const hook: HookFunction = async function (options) {
  if (options.result) {
    for (var f of options.result) {
      if (f.type == 'CustomLabels') {
        let fPath = f.filePath;
        fPath = f.filePath.substring(0, f.filePath.lastIndexOf('/'));
        convertLabels(fPath)
      } else if (f.type == 'Profile') {
        let sourcePath = f.filePath.substring(0, f.filePath.lastIndexOf('/'));
        convertProfile(sourcePath,f.fullName);
      } else if (f.type == 'PermissionSet') {
        let sourcePath = f.filePath.substring(0, f.filePath.lastIndexOf('/'));
        convertPermissionSet(sourcePath, f.fullName)
      }
    }
  }

};