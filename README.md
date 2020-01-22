# Ebay Oauth API

Fetch Oauth token for Ebay developer REST Api's using node js.

[![npm version](https://badge.fury.io/js/oauth-ebay.svg)](https://badge.fury.io/js/oauth-ebay)
[![Build Status](https://travis-ci.org/pajaydev/oauth-ebay.svg?branch=master)](https://travis-ci.org/pajaydev/oauth-ebay)

## [****NOT MAINTAINED*****] eBay officially published oauth module, kindly refer here https://github.com/eBay/ebay-oauth-nodejs-client]


## Installation

```shell
npm install oauth-ebay
```
or 

```shell
yarn add oauth-ebay
```

## Oauth Access Tokens

* [Client credentials grant](#client-credentials-grant)
* [Authorization code grant](#authorization-code-grant)
* [Examples](#examples)


### Client credentials grant

#### Options

```javascript
const ebayAuthToken = new EbayAuthToken({
    clientId: "-- ClientID -- ", // required
    clientSecret: "-- Client Secret --", // required
    grantType: "-- Grant type --", // optional
    scope: scopes, // array of scopes,
    state: '', // optional
    env: "PROD" // either SANDBOX or PROD (Default Value = PROD)
})
```
#### Example

```javascript
ebayAuthToken.getAccessToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});
```

### Authorization code grant

#### Options

```javascript
const ebayAuthToken = new EbayAuthToken({ 
    clientId: "-- ClientID -- ", // required
    clientSecret: "-- Client Secret --", // required
    grantType: "-- Grant type --", // optional
    scope: scopes,
    redirectUri: "-- redirect uri app name --" // required for getting user consent url.
})
```
* Get User consent url
```javascript
const userConsentUrl = ebayAuthToken.getUserConsentUrl();
```
* Open the userConsentUrl in the browser, which allows you to login in to ebay site. You will get a authorization code.

or if you are using express 
use ```res.direct(userConsentUrl);```

*  pass the authorization code got in the above step to getAuthorizationCodeToken method
```javascript
ebayAuthToken.getAuthorizationCodeToken(code).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});
```



#### Refresh token to update a User access token

```javascript
ebayAuthToken.getAccessTokenWithRefresh(refresh_token).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
});
```

## Examples
[Click here](https://github.com/pajaydev/oauth-ebay/blob/master/example.js)

## Issues
you can create issues or propose improvements here [Click here](https://github.com/pajaydev/oauth-ebay/issues)

## Useful links

Getting Client Id and Client Secret
```shell
https://developer.ebay.com/api-docs/static/oauth-credentials.html
```
Getting your redirect_uri value
```shell
https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html
```
Specifying right scopes
```shell
https://developer.ebay.com/api-docs/static/oauth-scopes.html
```
