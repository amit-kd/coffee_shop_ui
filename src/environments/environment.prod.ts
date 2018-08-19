const host = 'https://i-coffee-shop.herokuapp.com';
const baseUrl = host + '/coffeeshop/v1';
const clientId = 'testjwtclientid';
const clientSecret = 'XY7kmzoNzl100';
export const environment = {
  production: true,
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
