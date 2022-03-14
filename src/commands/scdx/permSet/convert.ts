/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as path from 'path';
import * as fs from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
import { SfdxError } from '@salesforce/core';

const xml2js = require('xml2js');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function convertPermissionSet(sourcepath, pSetName) {
  const permissionsetpath = path.join(sourcepath, pSetName);
  const data = fs.readFileSync(`${permissionsetpath}.permissionset-meta.xml`, { encoding: 'utf-8' });
  if (!fs.existsSync(permissionsetpath)) {
    fs.mkdirSync(permissionsetpath);
  }
  console.log('Created permissionset folder');
  console.log(`${permissionsetpath}.permissionset-meta.xml`);
  const parser = new xml2js.Parser({ explicitArray: false });
  if (!fs.existsSync(`${permissionsetpath}.permissionset-meta.xml`)) {
    throw new SfdxError('permissionset do not exist.');
  }
  parser.parseString(data, function (err, result) {
    if (err) {
      console.log('Something went wrong converting this permissionset.');
      console.log(err);
    } else if (result) {
      const psetObj = {};

      if (result.PermissionSet.licence) {
        psetObj['licence'] = result.PermissionSet.licence;
      }

      psetObj['description'] = result.PermissionSet.description;
      psetObj['label'] = result.PermissionSet.label;
      psetObj['hasActivationRequired'] = result.PermissionSet.hasActivationRequired;

      // permissionset
      fs.writeFileSync(permissionsetpath + '/' + pSetName + '.json', JSON.stringify(psetObj, null, 2));

      if (!result) {
        console.log(`Could not split ${pSetName}`);
        return;
      }
      // applicationVisibilities
      if (result.PermissionSet.applicationVisibilities) {
        if (!fs.existsSync(permissionsetpath + '/applicationVisibilities')) {
          fs.mkdirSync(permissionsetpath + '/applicationVisibilities');
        }
        if (!Array.isArray(result.PermissionSet.applicationVisibilities)) {
          result.PermissionSet.applicationVisibilities = [result.PermissionSet.applicationVisibilities];
        }
        result.PermissionSet.applicationVisibilities.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/applicationVisibilities/' + elem.application + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // classAccesses
      if (result.PermissionSet.classAccesses) {
        if (!fs.existsSync(permissionsetpath + '/classAccesses')) {
          fs.mkdirSync(permissionsetpath + '/classAccesses');
        }
        if (!Array.isArray(result.PermissionSet.classAccesses)) {
          result.PermissionSet.classAccesses = [result.PermissionSet.classAccesses];
        }
        result.PermissionSet.classAccesses.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/classAccesses/' + elem.apexClass + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }

      // customMetadataTypeAccesses
      if (result.PermissionSet.customMetadataTypeAccesses) {
        if (!fs.existsSync(permissionsetpath + '/customMetadataTypeAccesses')) {
          fs.mkdirSync(permissionsetpath + '/customMetadataTypeAccesses');
        }
        if (!Array.isArray(result.PermissionSet.customMetadataTypeAccesses)) {
          result.PermissionSet.customMetadataTypeAccesses = [result.PermissionSet.customMetadataTypeAccesses];
        }
        result.PermissionSet.customMetadataTypeAccesses.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/customMetadataTypeAccesses/' + elem.name + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // objectPermissions
      if (result.PermissionSet.objectPermissions) {
        if (!fs.existsSync(permissionsetpath + '/objectPermissions')) {
          fs.mkdirSync(permissionsetpath + '/objectPermissions');
        }
        if (!Array.isArray(result.PermissionSet.objectPermissions)) {
          result.PermissionSet.objectPermissions = [result.PermissionSet.objectPermissions];
        }
        result.PermissionSet.objectPermissions.forEach(function (elem) {
          if (!fs.existsSync(permissionsetpath + '/objectPermissions/' + elem.object)) {
            fs.mkdirSync(permissionsetpath + '/objectPermissions/' + elem.object);
          }
          fs.writeFileSync(
            permissionsetpath + '/objectPermissions/' + elem.object + '/' + elem.object + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // fieldPermissions
      if (result.PermissionSet.fieldPermissions) {
        if (!fs.existsSync(permissionsetpath + '/objectPermissions')) {
          fs.mkdirSync(permissionsetpath + '/objectPermissions');
        }
        if (!Array.isArray(result.PermissionSet.fieldPermissions)) {
          result.PermissionSet.fieldPermissions = [result.PermissionSet.fieldPermissions];
        }
        result.PermissionSet.fieldPermissions.forEach(function (elem) {
          const objectName = elem.field.split('.')[0];
          if (!fs.existsSync(permissionsetpath + '/objectPermissions/' + objectName)) {
            fs.mkdirSync(permissionsetpath + '/objectPermissions/' + objectName);
          }
          if (!fs.existsSync(permissionsetpath + '/objectPermissions/' + objectName + '/fieldPermissions')) {
            fs.mkdirSync(permissionsetpath + '/objectPermissions/' + objectName + '/fieldPermissions');
          }
          fs.writeFileSync(
            permissionsetpath + '/objectPermissions/' + objectName + '/fieldPermissions/' + elem.field + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // recordTypeVisibilities
      if (result.PermissionSet.recordTypeVisibilities) {
        if (!fs.existsSync(permissionsetpath + '/objectPermissions')) {
          fs.mkdirSync(permissionsetpath + '/objectPermissions');
        }
        if (!Array.isArray(result.PermissionSet.recordTypeVisibilities)) {
          result.PermissionSet.recordTypeVisibilities = [result.PermissionSet.recordTypeVisibilities];
        }
        result.PermissionSet.recordTypeVisibilities.forEach(function (elem) {
          const objectName = elem.recordType.split('.')[0];
          if (!fs.existsSync(permissionsetpath + '/objectPermissions/' + objectName)) {
            fs.mkdirSync(permissionsetpath + '/objectPermissions/' + objectName);
          }
          if (!fs.existsSync(permissionsetpath + '/objectPermissions/' + objectName + '/recordTypeVisibilities')) {
            fs.mkdirSync(permissionsetpath + '/objectPermissions/' + objectName + '/recordTypeVisibilities');
          }
          fs.writeFileSync(
            permissionsetpath +
              '/objectPermissions/' +
              objectName +
              '/recordTypeVisibilities/' +
              elem.recordType +
              '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // customPermissions
      if (result.PermissionSet.customPermissions) {
        if (!fs.existsSync(permissionsetpath + '/customPermissions')) {
          fs.mkdirSync(permissionsetpath + '/customPermissions');
        }
        if (!Array.isArray(result.PermissionSet.customPermissions)) {
          result.PermissionSet.customPermissions = [result.PermissionSet.customPermissions];
        }
        result.PermissionSet.customPermissions.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/customPermissions/' + elem.name + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // customSettingAccesses
      if (result.PermissionSet.customSettingAccesses) {
        if (!fs.existsSync(permissionsetpath + '/customSettingAccesses')) {
          fs.mkdirSync(permissionsetpath + '/customSettingAccesses');
        }
        if (!Array.isArray(result.PermissionSet.customSettingAccesses)) {
          result.PermissionSet.customSettingAccesses = [result.PermissionSet.customSettingAccesses];
        }
        result.PermissionSet.customSettingAccesses.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/customSettingAccesses/' + elem.name + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // externalDataSourceAccesses
      if (result.PermissionSet.externalDataSourceAccesses) {
        if (!fs.existsSync(permissionsetpath + '/externalDataSourceAccesses')) {
          fs.mkdirSync(permissionsetpath + '/externalDataSourceAccesses');
        }
        if (!Array.isArray(result.PermissionSet.externalDataSourceAccesses)) {
          result.PermissionSet.externalDataSourceAccesses = [result.PermissionSet.externalDataSourceAccesses];
        }
        result.PermissionSet.externalDataSourceAccesses.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/externalDataSourceAccesses/' + elem.externalDataSource + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // flowAccesses
      if (result.PermissionSet.flowAccesses) {
        if (!fs.existsSync(permissionsetpath + '/flowAccesses')) {
          fs.mkdirSync(permissionsetpath + '/flowAccesses');
        }
        if (!Array.isArray(result.PermissionSet.flowAccesses)) {
          result.PermissionSet.flowAccesses = [result.PermissionSet.flowAccesses];
        }
        const key = result.PermissionSet.flowAccesses[0].flowName == null ? 'flow' : 'flowName';
        result.PermissionSet.flowAccesses.forEach(function (elem) {
          fs.writeFileSync(permissionsetpath + '/flowAccesses/' + elem[key] + '.json', JSON.stringify(elem, null, 2));
        });
      }
      // pageAccesses
      if (result.PermissionSet.pageAccesses) {
        if (!fs.existsSync(permissionsetpath + '/pageAccesses')) {
          fs.mkdirSync(permissionsetpath + '/pageAccesses');
        }
        if (!Array.isArray(result.PermissionSet.pageAccesses)) {
          result.PermissionSet.pageAccesses = [result.PermissionSet.pageAccesses];
        }
        result.PermissionSet.pageAccesses.forEach(function (elem) {
          fs.writeFileSync(
            permissionsetpath + '/pageAccesses/' + elem.apexPage + '.json',
            JSON.stringify(elem, null, 2)
          );
        });
      }
      // tabVisibilities
      if (result.PermissionSet.tabSettings) {
        if (!fs.existsSync(permissionsetpath + '/tabSettings')) {
          fs.mkdirSync(permissionsetpath + '/tabSettings');
        }
        if (!Array.isArray(result.PermissionSet.tabSettings)) {
          result.PermissionSet.tabSettings = [result.PermissionSet.tabSettings];
        }
        result.PermissionSet.tabSettings.forEach(function (elem) {
          fs.writeFileSync(permissionsetpath + '/tabSettings/' + elem.tab + '.json', JSON.stringify(elem, null, 2));
        });
      }

      // userPermissions
      if (result.PermissionSet.userPermissions) {
        if (!fs.existsSync(permissionsetpath + '/userPermissions')) {
          fs.mkdirSync(permissionsetpath + '/userPermissions');
        }
        if (!Array.isArray(result.PermissionSet.userPermissions)) {
          result.PermissionSet.userPermissions = [result.PermissionSet.userPermissions];
        }
        result.PermissionSet.userPermissions.forEach(function (elem) {
          const key = elem.name;
          fs.writeFileSync(permissionsetpath + '/userPermissions/' + key + '.json', JSON.stringify(elem, null, 2));
        });
      }

      console.log('Converted:', pSetName);
    }
  });
}

export default class PermSetConvert extends SfdxCommand {
  public static description = 'Convert permissionset xml into small chunks of json files';

  public static examples = [
    '$ sfdx scdx:permissionset:convert',
    '$ sfdx scdx:permissionset:convert -p SuperUser -r src/permissionsets',
  ];

  public static args = [];

  protected static flagsConfig = {
    psetname: flags.string({ char: 'p', description: 'Permission set name to be converted' }),
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to permission set files files',
      default: 'force-app/main/default/permissionsets',
    }),
  };
  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run() {
    let pSetName = this.flags.psetname;
    let sourcepath = this.flags.sourcepath;
    if (pSetName) {
      try {
        convertPermissionSet(sourcepath, pSetName);
      } catch (err) {
        console.log(`Could not convert ${pSetName}`);
      }
    } else {
      fs.readdirSync(sourcepath).forEach((file) => {
        if (file.indexOf('permissionset-meta.xml') >= 0) {
          pSetName = file.split('.')[0];
          try {
            convertPermissionSet(this.flags.sourcepath, pSetName);
          } catch (err) {
            console.log(`Could not split ${pSetName}`);
          }
        }
      });
    }
  }
}
