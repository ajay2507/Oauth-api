const EbayAuthToken = require('./index');
const open = require('open');

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
    clientId: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45", // required
    clientSecret: "PRD-f1a91299c206-f184-45e0-b068-f139", // required
    grantType: "-- Grant type --", // optional
    scope: scopes,
    redirectUri: "Ajaykumar_Prath-Ajaykuma-nodeap-rcndhr" // required for getting user consent url.
});

// ebayAuthToken.getAccessToken().then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(`Error to get Access token :${JSON.stringify(error)}`);
// });


const consentUrl = ebayAuthToken.getUserConsentUrl(); // get user consent url.


(async () => {
    console.log(consentUrl);
    const response = await open(consentUrl, { wait: true });
    console.log(response);
})();
//https://auth.ebay.com/oauth2/authorize?client_id=Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45&redirect_uri=Ajaykumar_Prath-Ajaykuma-nodeap-uoqxr&response_type=code&scope=https://api.ebay.com/oauth/api_scope%20https://api.ebay.com/oauth/api_scope/sell.marketing.readonly%20https://api.ebay.com/oauth/api_scope/sell.marketing%20https://api.ebay.com/oauth/api_scope/sell.inventory.readonly%20https://api.ebay.com/oauth/api_scope/sell.inventory%20https://api.ebay.com/oauth/api_scope/sell.account.readonly%20https://api.ebay.com/oauth/api_scope/sell.account%20https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly%20https://api.ebay.com/oauth/api_scope/sell.fulfillment&prompt=