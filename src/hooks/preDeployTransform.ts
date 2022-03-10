
// import { readFileSync, writeFileSync } from 'fs';
// import { Builder, parseStringPromise } from 'xml2js';
import { Command, Hook } from '@oclif/config';
import { SourceComponent } from '@salesforce/source-deploy-retrieve';
import { buildLabels } from "../commands/scdx/label/build"
import {buildProfile} from "../commands/scdx/profile/build"
import {buildPermissionSet} from "../commands/scdx/permSet/build"
type HookFunction = (this: Hook.Context, options: HookOptions) => any;

type HookOptions = {
  Command: Command.Class;
  argv: string[];
  commandId: string;
  result?: SourceComponent[];
};

export const hook: HookFunction = async function (options) {


  if (options.result) {
    for (var res of options.result) {
      if (res.type.name == "CustomLabels") {
        buildLabels(res.xml.substring(0, res.xml.lastIndexOf('/')));
      } else if (res.type.name == 'Profile') {
        buildProfile(res.xml.substring(0, res.xml.lastIndexOf('/')), res.name);
      }else if (res.type.name == 'PermissionSet') {
        buildPermissiontSet(res.xml.substring(0, res.xml.lastIndexOf('/')), res.name);

      }
    }
  }

};