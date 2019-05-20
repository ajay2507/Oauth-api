const ebayAuthToken = new EbayAuthToken({
    clientId: "--- Client id ---",
    clientSecret: "--- Client Secret ---"
});

ebayAuthToken.getAccessToken().then((data) => {
    console.log(data);
});