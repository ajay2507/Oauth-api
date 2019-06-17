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
    scope: scopes,
    redirectUri: "-- redirect uri -- " // required for getting user consent url (Authorization Code Auth Flow).
});


var code = 'v%5E1.1%23i%5E1%23f%5E0%23r%5E1%23I%5E3%23p%5E3%23t%5EUl41XzA6OUQ0REI1OEQ5RjZBODA3NkU2QTIxQkZCODI0OUQ3RDFfMV8xI0VeMjYw'

// Client Crendential Auth Flow
ebayAuthToken.getClientCredentailsToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// Authorization Code Auth Flow
ebayAuthToken.getUserConsentUrl(); // get user consent url.


ebayAuthToken.getAuthorizationCodeToken('v%5E1.1%23i%5E1%23r%5E1%23I%5E3%23f%5E0%23p%5E3%23t%5EUl41Xzg6Qjk1MzVGRUEwRUI4MzUzQTgyQTBBMEYwNDQ4MDJENzRfMV8xI0VeMjYw').then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});
