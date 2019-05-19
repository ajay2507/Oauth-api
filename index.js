'use strict';

const https = require('https');
const consts = require('./constants');
const PROD_ENV = "PROD";
const SANDBOX_ENV = "SANDBOX";

class EbayOauthToken {
    constructor(options) {
        if (!options || !options.clientId || !options.clientSecret) {
            throw new Error('Invalid options');
        }
        if (!options.env) this.env = PROD_ENV;
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.baseUrl = PROD_BASE_URL;
        if (options.env === SANDBOX_ENV) {
            this.baseUrl = SANDBOX_BASE_URL;
        }
        if (!options.grantType) this.grantType = consts.DEFAULT_GRANT_TYPE;
        if (!options.scope) this.scope = consts.DEFAULT_SCOPE;
    }

    getAccessToken() {
        const encodedStr = base64Encode(this.clientId + ":" + this.clientSecret);
        const auth = "Basic " + encodedStr;
        const data = JSON.stringify({
            grant_type: this.grantType,
            scope: this.scope
        });
        return new Promise((resolve, reject) => {
            const request = https.request({
                headers: {
                    'Content-Length': Buffer.byteLength(data),
                    'Content-Type': "application/x-www-form-urlencoded",
                    "authorization": auth,
                },
                path: '/identity/v1/oauth2/token',
                hostname: this.baseUrl,
                method: 'POST'
            });

            request.on('response', response => {
                console.log("inside reponse");
                response.setEncoding('utf8');
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => {
                    resolve(body);
                })
            });

            request.on("error", (error) => {
                reject(error);
            });
            request.end(data);
        });
    }
}

module.exports = EbayOauthToken;