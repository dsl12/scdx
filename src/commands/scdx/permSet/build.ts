/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as path from 'path';
import * as fs from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
const js2xmlparser = require('js2xmlparser');
let sourcepath;

export function buildPermissionSet(PermissionSetname) {
  const PermissionSetpath = path.join(sourcepath, PermissionSetname);
  // PermissionSet
  const PermissionSetsetting = JSON.parse(
    fs.readFileSync(PermissionSetpath + '/' + PermissionSetname + '.json').toString()
  );

  let PermissionSet: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };
  if (PermissionSetsetting.custom) {
    PermissionSet['custom'] = PermissionSetsetting.custom;
  }
  if (PermissionSetsetting.userLicense) {
    PermissionSet['userLicense'] = PermissionSetsetting.userLicense;
  }
  if (PermissionSetsetting.loginHours) {
    PermissionSet['loginHours'] = PermissionSetsetting.loginHours;
  }
  if (PermissionSetsetting.loginIpRanges) {
    PermissionSet['loginIpRanges'] = PermissionSetsetting.loginIpRanges;
  }
  // applicationVisibilities
  PermissionSet.applicationVisibilities = [];
  if (fs.existsSync(PermissionSetpath + '/applicationVisibilities')) {
    fs.readdirSync(PermissionSetpath + '/applicationVisibilities')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.applicationVisibilities.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/applicationVisibilities/' + file).toString())
        );
      });
  }
  // classAccess
  PermissionSet.classAccesses = [];
  if (fs.existsSync(PermissionSetpath + '/classAccesses')) {
    fs.readdirSync(PermissionSetpath + '/classAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.classAccesses.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/classAccesses/' + file).toString())
        );
      });
  }
  // customSettingAccesses
  PermissionSet.customSettingAccesses = [];
  if (fs.existsSync(PermissionSetpath + '/customSettingAccesses')) {
    fs.readdirSync(PermissionSetpath + '/customSettingAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.customSettingAccesses.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/customSettingAccesses/' + file).toString())
        );
      });
  }
  // externalDataSourceAccesses
  PermissionSet.externalDataSourceAccesses = [];
  if (fs.existsSync(PermissionSetpath + '/externalDataSourceAccesses')) {
    fs.readdirSync(PermissionSetpath + '/externalDataSourceAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.externalDataSourceAccesses.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/externalDataSourceAccesses/' + file).toString())
        );
      });
  }
  // flowAccesses
  PermissionSet.flowAccesses = [];
  if (fs.existsSync(PermissionSetpath + '/flowAccesses')) {
    fs.readdirSync(PermissionSetpath + '/flowAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.flowAccesses.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/flowAccesses/' + file).toString())
        );
      });
  }

  // customMetadataTypeAccesses
  PermissionSet.customMetadataTypeAccesses = [];
  if (fs.existsSync(PermissionSetpath + '/customMetadataTypeAccesses')) {
    fs.readdirSync(PermissionSetpath + '/customMetadataTypeAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.customMetadataTypeAccesses.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/customMetadataTypeAccesses/' + file).toString())
        );
      });
  }
  // customPermissions
  PermissionSet.customPermissions = [];
  if (fs.existsSync(PermissionSetpath + '/customPermissions')) {
    fs.readdirSync(PermissionSetpath + '/customPermissions')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.customPermissions.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/customPermissions/' + file).toString())
        );
      });
  }
  // objects
  PermissionSet.objectPermissions = [];
  PermissionSet.fieldPermissions = [];
  PermissionSet.recordTypeVisibilities = [];
  if (fs.existsSync(PermissionSetpath + '/objectPermissions')) {
    fs.readdirSync(PermissionSetpath + '/objectPermissions')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        const objectpath = PermissionSetpath + '/objectPermissions/' + file;
        // objectPermissions
        if (fs.existsSync(objectpath + '/' + file + '.json')) {
          PermissionSet.objectPermissions.push(
            JSON.parse(fs.readFileSync(objectpath + '/' + file + '.json').toString())
          );
        }
        // fieldPermissions
        if (fs.existsSync(objectpath + '/fieldPermissions')) {
          fs.readdirSync(objectpath + '/fieldPermissions')
            .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
            .forEach((file) => {
              PermissionSet.fieldPermissions.push(
                JSON.parse(fs.readFileSync(objectpath + '/fieldPermissions/' + file).toString())
              );
            });
        }
        // recordTypeVisibilities
        if (fs.existsSync(objectpath + '/recordTypeVisibilities')) {
          fs.readdirSync(objectpath + '/recordTypeVisibilities')
            .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
            .forEach((file) => {
              PermissionSet.recordTypeVisibilities.push(
                JSON.parse(fs.readFileSync(objectpath + '/recordTypeVisibilities/' + file).toString())
              );
            });
        }
      });
  }

  // pageAccesses
  PermissionSet.pageAccesses = [];
  if (fs.existsSync(PermissionSetpath + '/pageAccesses')) {
    fs.readdirSync(PermissionSetpath + '/pageAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.pageAccesses.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/pageAccesses/' + file).toString())
        );
      });
  }
  // tabVisibilities
  PermissionSet.tabVisibilities = [];
  if (fs.existsSync(PermissionSetpath + '/tabVisibilities')) {
    fs.readdirSync(PermissionSetpath + '/tabVisibilities')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.tabVisibilities.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/tabVisibilities/' + file).toString())
        );
      });
  }
  // user permissions
  PermissionSet['userPermissions'] = [];

  if (fs.existsSync(PermissionSetpath + '/userPermissions')) {
    fs.readdirSync(PermissionSetpath + '/userPermissions')
      .sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
      .forEach((file) => {
        PermissionSet.userPermissions.push(
          JSON.parse(fs.readFileSync(PermissionSetpath + '/userPermissions/' + file).toString())
        );
      });
  }

  // sort PermissionSet attributes
  PermissionSet = sortObjKeysAlphabetically(PermissionSet);
  let xml = js2xmlparser.parse('PermissionSet', PermissionSet, { declaration: { encoding: 'UTF-8' } });
  while (xml.includes("'")) {
    xml = xml.replace("'", '"');
  }
  fs.writeFileSync(sourcepath + '/' + PermissionSetname + '.PermissionSet-meta.xml', xml);
}

const sortObjKeysAlphabetically = (obj) => Object.fromEntries(Object.entries(obj).sort());
export default class PermissionSetBuild extends SfdxCommand {
  public static description = 'Convert PermissionSet xml into small chunks of json files';

  public static examples = [
    '$ sfdx scdx:PermissionSet:build',
    '$ sfdx scdx:PermissionSet:build -p SuperUser -r src/PermissionSets',
  ];

  public static args = [];

  protected static flagsConfig = {
    psetname: flags.string({ char: 'p', description: 'Permission Set name to be converted' }),
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to Permission Set files',
      default: 'force-app/main/default/permissionsets',
    }),
  };

  public async run() {
    let PermissionSetname = this.flags.psetname;
    sourcepath = this.flags.sourcepath;
    if (PermissionSetname) {
      buildPermissionSet(PermissionSetname);
    } else {
      fs.readdirSync(sourcepath)
        .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
        .forEach((file) => {
          if (file.indexOf('permissionset-meta.xml') >= 0) {
            PermissionSetname = file.split('.')[0];
            buildPermissionSet(PermissionSetname);
          }
        });
    }
  }
}
