const EbayAuthToken = require('./index');

const scopes = ["https://api.ebay.com/oauth/api_scope",
    "https://api.ebay.com/oauth/api_scope/buy.marketplace.insights"
]
const ebayAuthToken = new EbayAuthToken({
    clientId: " App ID (Client ID)", // required
    clientSecret: "Cert ID (Client Secret)", // required
    env: "SANDBOX", // Enironment (default = PROD)
    scope: scopes, // array is scopes []
    redirectUri: "-- redirect uri -- " // required for getting user consent url (Authorization Code Auth Flow).
});


// Client Crendential Auth Flow
ebayAuthToken.getClientCredentailsToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// // Authorization Code Auth Flow
// ebayAuthToken.getUserConsentUrl(); // get user consent url.


// ebayAuthToken.getAuthorizationCodeToken(code).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
//     console.log(`Error to get Access token :${JSON.stringify(error)}`);
// });

// // Getting access token from refresh token obtained from Authorization Code flow
// ebayAuthToken.getAccessTokenWithRefresh().then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
// });