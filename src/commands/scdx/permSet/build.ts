/* eslint-disable guard-for-in */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as path from 'path';
import * as fs from 'fs';
import { SfdxError } from '@salesforce/core';

import { flags, SfdxCommand } from '@salesforce/command';
const js2xmlparser = require('js2xmlparser');
let outputDirectory: string;

export function buildPermissionSet(sourcepath, PermissionSetname) {
  if (outputDirectory == null) {
    outputDirectory = sourcepath;
  }

  const PermissionSetpath = path.join(sourcepath, PermissionSetname);
  // PermissionSet
  if (!fs.existsSync(PermissionSetpath + '/' + PermissionSetname + '.json')) {
    return;
  }
  const PermissionSetsetting = JSON.parse(
    fs.readFileSync(PermissionSetpath + '/' + PermissionSetname + '.json').toString()
  );

  let PermissionSet: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };
  if (PermissionSetsetting.description) {
    PermissionSet['description'] = PermissionSetsetting.description;
  }
  if (PermissionSetsetting.license) {
    PermissionSet['license'] = PermissionSetsetting.license;
  }
  if (PermissionSetsetting.hasActivationRequired) {
    PermissionSet['hasActivationRequired'] = PermissionSetsetting.hasActivationRequired;
  }
  if (PermissionSetsetting.label) {
    PermissionSet['label'] = PermissionSetsetting.label;
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
  fs.writeFileSync(outputDirectory + '/' + PermissionSetname + '.permissionset-meta.xml', xml);
}

const sortObjKeysAlphabetically = (obj) => Object.fromEntries(Object.entries(obj).sort());

export function buildPSetFromList(sourcepath: string, pSetName: string, pSetObj: Object) {
  const returnProfile: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };
  if (outputDirectory == null) {
    outputDirectory = sourcepath;
  }
  const metaDataTypes = Object.getOwnPropertyNames(pSetObj).sort();
  const pSetPath = path.join(sourcepath, pSetName);
  // base profile
  if (!fs.existsSync(pSetPath + '/' + pSetName + '.json')) {
    // eslint-disable-next-line no-console
    console.error(`Base permission set file not found for profile :${pSetName}`);
    return null;
  }

  let profilesetting;

  if (fs.existsSync(pSetPath + '/' + pSetName + '.json')) {
    profilesetting = JSON.parse(fs.readFileSync(pSetPath + '/' + pSetName + '.json').toString());
  } else {
    return;
  }

  if (profilesetting.custom) {
    returnProfile['custom'] = profilesetting.custom;
  }
  if (profilesetting.license) {
    returnProfile['license'] = profilesetting.license;
  }
  if (profilesetting.loginHours) {
    returnProfile['loginHours'] = profilesetting.loginHours;
  }
  if (profilesetting.loginIpRanges) {
    returnProfile['loginIpRanges'] = profilesetting.loginIpRanges;
  }

  returnProfile.objectPermissions = [];
  returnProfile.fieldPermissions = [];
  returnProfile.recordTypeVisibilities = [];

  for (const mType of metaDataTypes) {
    if (mType === 'objectPermissions') {
      // eslint-disable-next-line guard-for-in
      for (const objName in pSetObj[mType]) {
        for (const subMType in pSetObj[mType][objName]) {
          if (subMType == 'base') {
            const base = JSON.parse(fs.readFileSync(pSetObj[mType][objName][subMType], 'utf-8').toString());
            returnProfile.objectPermissions.push(base);
          } else {
            for (const fPath of pSetObj[mType][objName][subMType]) {
              const currentComponent = JSON.parse(fs.readFileSync(fPath, 'utf-8').toString());
              returnProfile[mType].push(currentComponent);
            }
          }
        }
      }
    } else {
      returnProfile[mType] = [];

      for (const fPath of pSetObj[mType].sort()) {
        if (mType !== 'userPermissions') {
          if (fs.existsSync(fPath)) {
            const objToAdd = JSON.parse(fs.readFileSync(fPath, 'utf-8').toString());
            returnProfile[mType].push(objToAdd);
          } else {
            // eslint-disable-next-line no-console
            console.log('it doesnt exist: ' + fPath);
          }
        }
      }

      if (!returnProfile.hasOwnProperty('userPermissions')) {
        returnProfile.userPermissions = [];
      }

      if (fs.existsSync(pSetPath + '/' + 'userPermissions')) {
        fs.readdirSync(pSetPath + '/' + 'userPermissions')
          .sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
          .forEach((file) => {
            returnProfile.userPermissions.push(
              JSON.parse(fs.readFileSync(pSetPath + '/userPermissions/' + file).toString())
            );
          });
      }
    }
  }

  return sortObjKeysAlphabetically(returnProfile);
}

export function buildFromList(sourcepath: string, components: string, PermissionSetname: string) {
  const componentMap = constructComponentMap(components);

  if (PermissionSetname) {
    const profToDelete = [];

    for (const profName in componentMap) {
      if (profName !== PermissionSetname) {
        profToDelete.push(profName);
      }
    }

    for (const profName of profToDelete) {
      delete componentMap[profName];
    }
  }
  for (const prof in componentMap) {
    const pSetObj = buildPSetFromList(sourcepath, prof, componentMap[prof]);

    if (pSetObj) {
      let xml = js2xmlparser.parse('PermissionSet', pSetObj, { declaration: { encoding: 'UTF-8' } });
      while (xml.includes("'")) {
        xml = xml.replace("'", '"');
      }

      // eslint-disable-next-line no-console
      console.log('time to write!');

      fs.writeFileSync(outputDirectory + '/' + prof + '.permissionset-meta.xml', xml);
    }
  }
}

function constructComponentMap(components: string) {
  const returnC = {};
  const paths = components.split(',');

  paths.forEach((p) => {
    const delimiter = 'permissionsets/';
    const theIndex = p.lastIndexOf(delimiter);
    const currPath = p.substring(theIndex + delimiter.length);
    const basePath = p.substring(0, theIndex + delimiter.length);
    const indexFirstSlash = currPath.indexOf('/');
    const pSetName = currPath.substring(0, indexFirstSlash);
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-console
    const subPath = currPath.substring(indexFirstSlash + 1);
    let metaDataType = subPath.substring(0, subPath.indexOf('/'));
    if (metaDataType === '') {
      metaDataType = 'base';
    }
    const fileName = subPath.substring(subPath.indexOf('/') + 1);

    let currentProfile = {};
    if (returnC.hasOwnProperty(pSetName)) {
      currentProfile = returnC[pSetName];
    }

    if (metaDataType === 'objectPermissions') {
      let currOvrObjPerm = {};
      if (currentProfile.hasOwnProperty(metaDataType)) {
        currOvrObjPerm = currentProfile[metaDataType];
      }

      const objName = fileName.substring(0, fileName.indexOf('/'));
      let curObjPerm = {};
      if (currOvrObjPerm.hasOwnProperty(objName)) {
        curObjPerm = currOvrObjPerm[objName];
      }

      const subFileName = fileName.substring(fileName.indexOf('/') + 1);

      // We've already added teh base file so we only want field permissions and record type visibility
      if (subFileName.includes('/')) {
        const submetType = subFileName.substring(0, subFileName.indexOf('/'));
        let subMetList = [];
        if (curObjPerm.hasOwnProperty(submetType)) {
          subMetList = curObjPerm[submetType];
        }

        subMetList.push(p.trim());
        curObjPerm[submetType] = subMetList;
        currOvrObjPerm[objName] = curObjPerm;
        currentProfile[metaDataType] = currOvrObjPerm;
      } else {
        curObjPerm['base'] = basePath + pSetName + '/' + metaDataType + '/' + objName + '/' + objName + '.json';
      }
      currOvrObjPerm[objName] = curObjPerm;
      currentProfile[metaDataType] = currOvrObjPerm;
    } else {
      let currentListMetadata = [];
      if (currentProfile.hasOwnProperty(metaDataType)) {
        currentListMetadata = currentProfile[metaDataType];
      }
      currentListMetadata.push(p.trim());
      currentProfile[metaDataType] = currentListMetadata;
    }

    returnC[pSetName] = currentProfile;
  });
  return returnC;
}
export default class PermissionSetBuild extends SfdxCommand {
  public static description = 'Builds small json files into a permission set xml';

  public static examples = [
    '$ sfdx scdx:PermissionSet:build',
    '$ sfdx scdx:PermissionSet:build -p SuperUser -r src/permissionsets',
    '$ sfdx scdx:PermissionSet:build -p SuperUser -r src/permissionsets -o outputDirectory/permission sets',
    '$ sfdx scdx:PermissionSet:build -p SuperUser -r src/permissionsets -c aFold/desiredComponents.txt',
  ];

  public static args = [];

  protected static flagsConfig = {
    psetname: flags.string({ char: 'p', description: 'Permission Set name to be built' }),
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to Permission Set files',
      default: 'force-app/main/default/permissionsets',
    }),
    components: flags.string({
      char: 'c',
      description: 'Path to file containing  seperated paths to components to be built into Permission Set',
    }),
    output: flags.string({
      char: 'o',
      description: 'Output path to write Permission Sets to.',
    }),
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/require-await
  public async run() {
    let PermissionSetname = this.flags.psetname;
    const sourcepath = this.flags.sourcepath;
    outputDirectory = this.flags.output ? this.flags.output : sourcepath;

    if (this.flags.components) {
      if (fs.existsSync(this.flags.components)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // eslint-disable-next-line prefer-const
        let compList = fs.readFileSync(this.flags.components, 'utf-8');
        try {
          buildFromList(sourcepath, compList, PermissionSetname);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const errorMessage = 'Component file not found :' + this.flags.components;
        // To throw a non-bundle-based error:
        throw new SfdxError(errorMessage, 'FileNotFound');
      }

      // components = constructComponentMap(this.flags.components);
    } else if (PermissionSetname) {
      buildPermissionSet(sourcepath, PermissionSetname);
    } else {
      const thepath = path.resolve(sourcepath);
      const direct = fs.opendirSync(thepath);
      let nextFolder = direct.readSync();
      const folders = [];
      while (nextFolder != null) {
        if (!nextFolder.name.includes('.')) {
          folders.push(nextFolder.name);
        }
        nextFolder = direct.readSync();
      }

      direct.closeSync();

      folders.forEach((file) => {
        buildPermissionSet(sourcepath, file);
      });
    }
  }
}
