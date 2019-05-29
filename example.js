const EbayAuthToken = require('./index');

const ebayAuthToken = new EbayAuthToken({
    clientId: "--- Client id ----", // required
    clientSecret: "--- Client Secret ----", // required
    grantType: "--- Grant Type ---" // optional
});

ebayAuthToken.getAccessToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});