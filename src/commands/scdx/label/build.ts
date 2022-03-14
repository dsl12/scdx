/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as fs from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';

import * as js2xmlparser from 'js2xmlparser';
let sourcepath, outputDirectory;
let labelLibrary = {};
let allLabel = true;
let allowedNames = [];

export function buildLabels(sourcepath) {
  let CustomLabels: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };
  CustomLabels.labels = [];
  if (fs.existsSync(sourcepath)) {
    fs.readdirSync(sourcepath)

      .sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
      .filter((f) => f.includes('.json'))
      .forEach((file) => {
        const jsonLabel = JSON.parse(fs.readFileSync(sourcepath + '/' + file).toString());
        if (allLabel || labelLibrary.hasOwnProperty(file) || allowedName(jsonLabel)) {
          CustomLabels.labels.push(jsonLabel);
        }
      });
  }

  let xml = js2xmlparser.parse('CustomLabels', CustomLabels, { declaration: { encoding: 'UTF-8' } });
  while (xml.includes("'")) {
    xml = xml.replace("'", '"');
  }
  fs.writeFileSync(sourcepath + '/CustomLabels.Labels-meta.xml', xml);
}

function allowedName(labelObj): boolean {
  return allowedNames.includes(labelObj['fullName']);
}

export default class LabelBuild extends SfdxCommand {
  public static description = 'Convert label xml into small chunks of json files';

  public static examples = ['$ sfdx scdx:label:build', '$ sfdx scdx:label:build  -r src/labels'];

  public static args = [];

  protected static flagsConfig = {
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to label files',
      default: 'force-app/main/default/labels',
    }),
    components: flags.string({
      char: 'c',
      description: 'Path to file containing  seperated paths to labels to be built into label xml',
    }),
    list: flags.string({
      char: 'l',
      description: 'Text list of label names to include',
    }),
    output: flags.string({
      char: 'o',
      description: 'Output path to write label xml to.',
    }),
  };

  public async run() {
    sourcepath = this.flags.sourcepath;
    outputDirectory = this.flags.output ? this.flags.output : sourcepath;

    if (this.flags.components) {
      const compPath = this.flags.components;
      if (fs.existsSync(compPath)) {
        allLabel = false;
        const raw = fs.readFileSync(compPath, 'utf-8');
        const labels = raw.split(',');
        for (const l of labels) {
          labelLibrary[l] = l;
        }
      }
    }

    if (this.flags.list) {
      allLabel = false;
      const labelNames = this.flags.list.split(',');
      allowedNames = labelNames;
    }

    try {
      buildLabels(sourcepath);
    } catch (err) {}
  }
}
