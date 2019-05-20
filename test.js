'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const EbayAuthToken = require('./index');

const ebayAuthToken = new EbayAuthToken({
    clientId: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: "PRD-f1a91299c206-f184-45e0-b068-f139"
});

ebayAuthToken.getAccessToken().then((data) => {
    console.log(data);
});

