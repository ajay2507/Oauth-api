const EbayAuthToken = require('./index');

const ebayAuthToken = new EbayAuthToken({
    clientId: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: "00ea1cc2-5d0f-440a-bd93-77754b21651c",
    //grantType: "--- Grant Type ---"
});

ebayAuthToken.getAccessToken().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});