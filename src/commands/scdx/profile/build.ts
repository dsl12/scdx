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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildProfile(sourcepath: string, profilename: string): void {
  const profilepath = path.join(sourcepath, profilename);
  // profile
  const profilesetting = JSON.parse(fs.readFileSync(profilepath + '/' + profilename + '.json').toString());

  let profile: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };
  if (profilesetting.custom) {
    profile['custom'] = profilesetting.custom;
  }
  if (profilesetting.userLicense) {
    profile['userLicense'] = profilesetting.userLicense;
  }
  if (profilesetting.loginHours) {
    profile['loginHours'] = profilesetting.loginHours;
  }
  if (profilesetting.loginIpRanges) {
    profile['loginIpRanges'] = profilesetting.loginIpRanges;
  }
  // applicationVisibilities
  profile.applicationVisibilities = [];
  if (fs.existsSync(profilepath + '/applicationVisibilities')) {
    fs.readdirSync(profilepath + '/applicationVisibilities')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.applicationVisibilities.push(
          JSON.parse(fs.readFileSync(profilepath + '/applicationVisibilities/' + file).toString())
        );
      });
  }
  // classAccess
  profile.classAccesses = [];
  if (fs.existsSync(profilepath + '/classAccesses')) {
    fs.readdirSync(profilepath + '/classAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.classAccesses.push(JSON.parse(fs.readFileSync(profilepath + '/classAccesses/' + file).toString()));
      });
  }
  // customSettingAccesses
  profile.customSettingAccesses = [];
  if (fs.existsSync(profilepath + '/customSettingAccesses')) {
    fs.readdirSync(profilepath + '/customSettingAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.customSettingAccesses.push(
          JSON.parse(fs.readFileSync(profilepath + '/customSettingAccesses/' + file).toString())
        );
      });
  }
  // externalDataSourceAccesses
  profile.externalDataSourceAccesses = [];
  if (fs.existsSync(profilepath + '/externalDataSourceAccesses')) {
    fs.readdirSync(profilepath + '/externalDataSourceAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.externalDataSourceAccesses.push(
          JSON.parse(fs.readFileSync(profilepath + '/externalDataSourceAccesses/' + file).toString())
        );
      });
  }
  // flowAccesses
  profile.flowAccesses = [];
  if (fs.existsSync(profilepath + '/flowAccesses')) {
    fs.readdirSync(profilepath + '/flowAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.flowAccesses.push(JSON.parse(fs.readFileSync(profilepath + '/flowAccesses/' + file).toString()));
      });
  }
  // categoryGroupVisibilities
  profile.categoryGroupVisibilities = [];
  if (fs.existsSync(profilepath + '/categoryGroupVisibilities')) {
    fs.readdirSync(profilepath + '/categoryGroupVisibilities')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.categoryGroupVisibilities.push(
          JSON.parse(fs.readFileSync(profilepath + '/categoryGroupVisibilities/' + file).toString())
        );
      });
  }
  // customMetadataTypeAccesses
  profile.customMetadataTypeAccesses = [];
  if (fs.existsSync(profilepath + '/customMetadataTypeAccesses')) {
    fs.readdirSync(profilepath + '/customMetadataTypeAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.customMetadataTypeAccesses.push(
          JSON.parse(fs.readFileSync(profilepath + '/customMetadataTypeAccesses/' + file).toString())
        );
      });
  }
  // customPermissions
  profile.customPermissions = [];
  if (fs.existsSync(profilepath + '/customPermissions')) {
    fs.readdirSync(profilepath + '/customPermissions')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.customPermissions.push(
          JSON.parse(fs.readFileSync(profilepath + '/customPermissions/' + file).toString())
        );
      });
  }
  // objects
  profile.objectPermissions = [];
  profile.fieldPermissions = [];
  profile.recordTypeVisibilities = [];
  if (fs.existsSync(profilepath + '/objectPermissions')) {
    fs.readdirSync(profilepath + '/objectPermissions')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        const objectpath = profilepath + '/objectPermissions/' + file;
        // objectPermissions
        if (fs.existsSync(objectpath + '/' + file + '.json')) {
          profile.objectPermissions.push(JSON.parse(fs.readFileSync(objectpath + '/' + file + '.json').toString()));
        }
        // fieldPermissions
        if (fs.existsSync(objectpath + '/fieldPermissions')) {
          fs.readdirSync(objectpath + '/fieldPermissions')
            .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
            .forEach((file) => {
              profile.fieldPermissions.push(
                JSON.parse(fs.readFileSync(objectpath + '/fieldPermissions/' + file).toString())
              );
            });
        }
        // recordTypeVisibilities
        if (fs.existsSync(objectpath + '/recordTypeVisibilities')) {
          fs.readdirSync(objectpath + '/recordTypeVisibilities')
            .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
            .forEach((file) => {
              profile.recordTypeVisibilities.push(
                JSON.parse(fs.readFileSync(objectpath + '/recordTypeVisibilities/' + file).toString())
              );
            });
        }
      });
  }
  // layoutAssignments
  profile.layoutAssignments = [];
  if (fs.existsSync(profilepath + '/layoutAssignments')) {
    fs.readdirSync(profilepath + '/layoutAssignments')
      .sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.layoutAssignments.push(
          JSON.parse(fs.readFileSync(profilepath + '/layoutAssignments/' + file).toString())
        );
      });
  }

  profile.layoutAssignments = profile.layoutAssignments.sort((a: any, b: any) => {
    if (a.layout > b.layout) {
      return 1;
    } else if (b.layout > a.layout) {
      return -1;
    } else {
      return a.recordType > b.recordType ? 1 : -1;
    }
  });

  // pageAccesses
  profile.pageAccesses = [];
  if (fs.existsSync(profilepath + '/pageAccesses')) {
    fs.readdirSync(profilepath + '/pageAccesses')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.pageAccesses.push(JSON.parse(fs.readFileSync(profilepath + '/pageAccesses/' + file).toString()));
      });
  }
  // tabVisibilities
  profile.tabVisibilities = [];
  if (fs.existsSync(profilepath + '/tabVisibilities')) {
    fs.readdirSync(profilepath + '/tabVisibilities')
      .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.tabVisibilities.push(JSON.parse(fs.readFileSync(profilepath + '/tabVisibilities/' + file).toString()));
      });
  }
  // user permissions
  profile['userPermissions'] = [];

  if (fs.existsSync(profilepath + '/userPermissions')) {
    fs.readdirSync(profilepath + '/userPermissions')
      .sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
      .forEach((file) => {
        profile.userPermissions.push(JSON.parse(fs.readFileSync(profilepath + '/userPermissions/' + file).toString()));
      });
  }

  // sort profile attributes
  profile = sortObjKeysAlphabetically(profile);
  let xml = js2xmlparser.parse('Profile', profile, { declaration: { encoding: 'UTF-8' } });
  while (xml.includes("'")) {
    xml = xml.replace("'", '"');
  }
  fs.writeFileSync(outputDirectory + '/' + profilename + '.profile-meta.xml', xml);
}

export function buildFromList(sourcepath: string, components: string, profileName: string) {
  const componentMap = constructComponentMap(components);

  if (profileName) {
    const profToDelete = [];

    for (const profName in componentMap) {
      if (profName !== profileName) {
        profToDelete.push(profName);
      }
    }

    for (const profName of profToDelete) {
      delete componentMap[profName];
    }
  }

  for (const prof in componentMap) {
    const profileObj = buildProfileFromList(sourcepath, prof, componentMap[prof]);

    if (profileObj) {
      let xml = js2xmlparser.parse('Profile', profileObj, { declaration: { encoding: 'UTF-8' } });
      while (xml.includes("'")) {
        xml = xml.replace("'", '"');
      }

      console.log('time to write!');

      fs.writeFileSync(outputDirectory + '/' + prof + '.profile-meta.xml', xml);
    }
  }
}

export function buildProfileFromList(sourcepath: string, profileName: string, profileObj: Object) {
  const returnProfile: any = {
    '@': { xmlns: 'http://soap.sforce.com/2006/04/metadata' },
  };

  const metaDataTypes = Object.getOwnPropertyNames(profileObj).sort();
  const profilepath = path.join(sourcepath, profileName);
  // base profile
  if (!fs.existsSync(profilepath + '/' + profileName + '.json')) {
    // eslint-disable-next-line no-console
    console.error(`Base profile file not found for profile :${profileName}`);
    return null;
  }
  const profilesetting = JSON.parse(fs.readFileSync(profilepath + '/' + profileName + '.json').toString());

  if (profilesetting.custom) {
    returnProfile['custom'] = profilesetting.custom;
  }
  if (profilesetting.userLicense) {
    returnProfile['userLicense'] = profilesetting.userLicense;
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
      for (const objName in profileObj[mType]) {
        for (const subMType in profileObj[mType][objName]) {
          if (subMType == 'base') {
            const base = JSON.parse(fs.readFileSync(profileObj[mType][objName][subMType], 'utf-8').toString());
            returnProfile.objectPermissions.push(base);
          } else {
            for (const fPath of profileObj[mType][objName][subMType]) {
              const currentComponent = JSON.parse(fs.readFileSync(fPath, 'utf-8').toString());
              returnProfile[mType].push(currentComponent);
            }
          }
        }
      }
    } else {
      returnProfile[mType] = [];

      for (const fPath of profileObj[mType].sort()) {
        if (fs.existsSync(fPath)) {
          const objToAdd = JSON.parse(fs.readFileSync(fPath, 'utf-8').toString());
          returnProfile[mType].push(objToAdd);
        } else {
          console.log('it doesnt exist!' + fPath);
        }
      }
    }
  }

  return sortObjKeysAlphabetically(returnProfile);
}

function constructComponentMap(components: string) {
  const returnC = {};
  const paths = components.split(',');

  paths.forEach((p) => {
    const delimiter = 'profiles/';
    const theIndex = p.lastIndexOf(delimiter);
    const currPath = p.substring(theIndex + delimiter.length);
    const basePath = p.substring(0, theIndex + delimiter.length);
    const indexFirstSlash = currPath.indexOf('/');
    const profileName = currPath.substring(0, indexFirstSlash);
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-console
    const subPath = currPath.substring(indexFirstSlash + 1);
    let metaDataType = subPath.substring(0, subPath.indexOf('/'));
    if (metaDataType === '') {
      metaDataType = 'base';
    }
    const fileName = subPath.substring(subPath.indexOf('/') + 1);

    let currentProfile = {};
    if (returnC.hasOwnProperty(profileName)) {
      currentProfile = returnC[profileName];
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
        curObjPerm['base'] = basePath + profileName + '/' + metaDataType + '/' + objName + '/' + objName + '.json';
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

    returnC[profileName] = currentProfile;
  });
  return returnC;
}

const sortObjKeysAlphabetically = (obj) => Object.fromEntries(Object.entries(obj).sort());
export default class ProfileBuild extends SfdxCommand {
  public static description = 'Convert into small chunks of json files into a profile xml';

  public static examples = ['$ sfdx scdx:profile:build', '$ sfdx scdx:profile:build -p Admin -r src/profiles'];

  public static args = [];

  protected static flagsConfig = {
    profilename: flags.string({ char: 'p', description: 'Profile name to be built' }),
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to profile files',
      default: 'force-app/main/default/profiles',
    }),
    components: flags.string({
      char: 'c',
      description: 'Path to file containing  seperated paths to components to be built into profile',
    }),
    output: flags.string({
      char: 'o',
      description: 'Output path to write profiles to.',
    }),
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  public async run() {
    let profilename = this.flags.profilename;
    const sourcepath = this.flags.sourcepath;
    outputDirectory = this.flags.output ? this.flags.output : sourcepath;

    if (this.flags.components) {
      if (fs.existsSync(this.flags.components)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // eslint-disable-next-line prefer-const
        let compList = fs.readFileSync(this.flags.components, 'utf-8');
        try {
          buildFromList(sourcepath, compList, profilename);
        } catch (err) {
          console.error(err);
        }
      } else {
        const errorMessage = 'Component file not found :' + this.flags.components;
        // To throw a non-bundle-based error:
        throw new SfdxError(errorMessage, 'FileNotFound');
      }

      // components = constructComponentMap(this.flags.components);
    } else if (profilename) {
      buildProfile(sourcepath, profilename);
    } else {
      fs.readdirSync(sourcepath)
        .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
        .forEach((file) => {
          if (file.indexOf('profile-meta.xml') >= 0) {
            profilename = file.split('.')[0];
            buildProfile(sourcepath, profilename);
          }
        });
    }
  }
}
