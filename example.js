const EbayAuthToken = require('./index');

const scopes = ["https://api.ebay.com/oauth/api_scope",
    "https://api.ebay.com/oauth/api_scope/sell.marketing.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.marketing",
    "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.inventory",
    "https://api.ebay.com/oauth/api_scope/sell.account.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.account",
    "https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.fulfillment"
]
const ebayAuthToken = new EbayAuthToken({
    clientId: " -- Client ID -- ", // required
    clientSecret: " -- Client Secret ---", // required
    env: "SANDBOX", // Enironment (default = PROD)
    scope: scopes, // array is scopes []
    state: 'xyz', // optional value master
    redirectUri: "-- redirect uri -- " // required for getting user consent url (Authorization Code Auth Flow).
});


// Client Crendential Auth Flow
ebayAuthToken.getClientCredentailsToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// Authorization Code Auth Flow
ebayAuthToken.getUserConsentUrl(); // get user consent url.


ebayAuthToken.getAuthorizationCodeToken(code).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// Getting access token from refresh token obtained from Authorization Code flow
ebayAuthToken.getAccessTokenWithRefresh().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
});