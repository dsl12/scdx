/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as path from 'path';
import * as fs from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
const js2xmlparser = require('js2xmlparser');
let sourcepath;

function buildLabels(sourcepath) {
  
  let CustomLabels: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };
  CustomLabels.labels = [];
  if (fs.existsSync(sourcepath)) {
    fs.readdirSync(sourcepath)
      
      .sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
      .filter((f) => f.includes('.json'))
      .forEach((file) => {
        CustomLabels.labels.push(
          JSON.parse(fs.readFileSync(sourcepath + '/' + file).toString())
        );
      });
  }
  
  let xml = js2xmlparser.parse('CustomLabels', CustomLabels, { declaration: { encoding: 'UTF-8' } });
  while (xml.includes("'")) {
    xml = xml.replace("'", '"');
  }
  fs.writeFileSync(sourcepath + '/CustomLabels.Labels-meta.xml' , xml);
}

const sortObjKeysAlphabetically = (obj) => Object.fromEntries(Object.entries(obj).sort());
export default class LabelBuild extends SfdxCommand {
  public static description = 'Convert label xml into small chunks of json files';

  public static examples = [
    '$ sfdx scdx:label:build',
    '$ sfdx scdx:label:build  -r src/labels',
  ];

  public static args = [];

  protected static flagsConfig = {
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to label files',
      default: 'force-app/main/default/labels',
    }),
  };

  public async run() {
    sourcepath = this.flags.sourcepath;
    try {
      buildLabels(sourcepath);
    } catch (err) {
      console.log(err);
      console.log('Could not build labels');
    }
  }
}
