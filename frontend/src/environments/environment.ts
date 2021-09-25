// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appVersion: require('../../package.json').version + '-dev',
  firebase: {
    apiKey: "AIzaSyCCnaMholBQzKIT00_EliHoJGQ4GlG2QQ4",
    authDomain: "anonymoussystemswebapp.firebaseapp.com",
    projectId: "anonymoussystemswebapp",
    storageBucket: "anonymoussystemswebapp.appspot.com",
    messagingSenderId: "1096110030107",
    appId: "1:1096110030107:web:7c32f5e36c824cdc6ce7be",
    measurementId: "G-JW152HK8BY"
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
