/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as fs from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
import { SfdxError } from '@salesforce/core';

import xml2js = require('xml2js');
let sourcepath;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function convertLabels(sourcepath) {
  const data = fs.readFileSync(`${sourcepath}/CustomLabels.Labels-meta.xml`, { encoding: 'utf-8' });
  console.log('Read file');

  const parser = new xml2js.Parser({ explicitArray: false });
  if (!fs.existsSync(`${sourcepath}/CustomLabels.Labels-meta.xml`)) {
    throw new SfdxError('labels do not exist.');
  }
  parser.parseString(data, function (err, result) {
    if (err) {
      console.log('Something went wrong converting the labels');
      console.log(err);
    } else if (result) {
      // permissionset

      if (!result) {
        console.log('Could not split labels');
        return;
      }

      if (result.CustomLabels.labels) {
        result.CustomLabels.labels.forEach(function (elem) {
          fs.writeFileSync(sourcepath + '/' + elem.fullName + '.json', JSON.stringify(elem, null, 2));
        });
      }
    }
  });
}


export default class Label extends SfdxCommand {
  public static description = 'Convert Label xml into small chunks of json files';

  public static examples = ['$ sfdx scdx:label:convert', '$ sfdx scdx:permissionset:convert -r src/labels'];

  public static args = [];

  protected static flagsConfig = {
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to label file',
      default: 'force-app/main/default/labels/CustomLabels',
    }),
  };
  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run() {
    sourcepath = this.flags.sourcepath;
    try {
      convertLabels(sourcepath);
    } catch (err) {
      console.log('Could not convert labels');
    }
  }
}
