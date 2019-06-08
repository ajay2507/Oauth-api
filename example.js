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
    clientId: "-- ClientID -- ", // required
    clientSecret: "-- CLient Secret --", // required
    grantType: "-- Grant type --", // optional
    scope: scopes,
    redirectUri: "-- redirect uri app name --" // required for getting user consent url.
});

ebayAuthToken.getAccessToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});


ebayAuthToken.getUserConsentUrl() // get user consent url.