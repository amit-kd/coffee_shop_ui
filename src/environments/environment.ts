// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = 'http://localhost:8080';
const baseUrl = host + '/coffeeshop/v1';
const clientId = 'testjwtclientid';
const clientSecret = 'XY7kmzoNzl100';
export const environment = {
  production: false,
  tokenUrl: host + '/oauth/token',
  loginUrl: baseUrl + '/user/login',
  signupUrl: baseUrl + '/register',
  productUrl: baseUrl + '/products',
  orderUrl: baseUrl + '/user/orders',
  updateOrderUrl: baseUrl + '/user/order'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
