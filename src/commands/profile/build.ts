/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as path from 'path';
import * as fs from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
const js2xmlparser = require('js2xmlparser');
let sourcepath;

function buildProfile(profilename) {
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
  fs.writeFileSync(sourcepath + '/' + profilename + '.profile-meta.xml', xml);
}

const sortObjKeysAlphabetically = (obj) => Object.fromEntries(Object.entries(obj).sort());
export default class ProfileBuild extends SfdxCommand {
  public static description = 'Convert profile xml into small chunks of json files';

  public static examples = ['$ sfdx scdx:profile:build', '$ sfdx scdx:profile:build -p Admin -r src/profiles'];

  public static args = [];

  protected static flagsConfig = {
    profilename: flags.string({ char: 'p', description: 'Profile name to be converted' }),
    sourcepath: flags.string({
      char: 'r',
      description: 'Path to profile files',
      default: 'force-app/main/default/profiles',
    }),
  };

  public async run() {
    let profilename = this.flags.profilename;
    sourcepath = this.flags.sourcepath;
    if (profilename) {
      buildProfile(profilename);
    } else {
      fs.readdirSync(sourcepath)
        .sort((a: any, b: any) => (b.isDir - a.isDir || a.name > b.name ? -1 : 1))
        .forEach((file) => {
          if (file.indexOf('profile-meta.xml') >= 0) {
            profilename = file.split('.')[0];
            buildProfile(profilename);
          }
        });
    }
  }
}
