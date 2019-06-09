'use strict';

const https = require('https');
const consts = require('./constants');
const queryString = require('querystring');
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';

class EbayOauthToken {
    constructor(options) {
        if (!options || !options.clientId || !options.clientSecret) {
            throw new Error('Invalid options or input');
        }
        if (!options.env) { this.env = PROD_ENV; };
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.baseUrl = consts.PROD_BASE_URL;
        this.baseConsentUrl = consts.PROD_SIGNIN_ENDPOINT;
        if (options.env === SANDBOX_ENV) {
            this.baseUrl = consts.SANDBOX_BASE_URL;
            this.baseConsentUrl = consts.SANDBOX_SIGNIN_ENDPOINT;
        }
        if (options.hostname) {
            this.baseUrl = options.hostname;
        }
        this.redirectUri = options.redirectUri || '';
        this.grantType = (!options.grantType) ? consts.DEFAULT_GRANT_TYPE : options.grantType;
        this.scope = (!options.scope) ? consts.DEFAULT_SCOPE : options.scope;
        this.prompt = options.prompt || '';
    }

    getAccessToken() {
        const encodedStr = base64Encode(this.clientId + ':' + this.clientSecret);
        const auth = 'Basic ' + encodedStr;
        const data = queryString.stringify({
            grant_type: this.grantType,
            scope: this.scope
        });
        return new Promise((resolve, reject) => {
            const request = https.request({
                headers: {
                    'Content-Length': data.length,
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': auth
                },
                path: '/identity/v1/oauth2/token',
                hostname: this.baseUrl,
                method: 'POST'
            });
            request.on('response', response => {
                let body = '';
                response.setEncoding('utf8');
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => {
                    body = JSON.parse(body);
                    if (body.error) {
                        reject(body);
                    }
                    resolve(body);
                });
            });

            request.on('error', (error) => {
                reject(error);
            });
            request.end(data);
        });
    }

    getUserConsentUrl() {
        if (!this.redirectUri) {
            throw new Error('redirect_uri is required for redirection after sign in \n kindly check here https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html');
        }
        let queryParam = 'client_id=' + this.clientId;
        queryParam = queryParam + '&redirect_uri=' + this.redirectUri;
        queryParam = queryParam + '&response_type=code';
        if (Array.isArray(this.scope)) {
            this.scope = this.scope.join('%20');
        }
        queryParam = queryParam + '&scope=' + this.scope;
        queryParam = queryParam + '&prompt=' + this.prompt;
        return `${this.baseConsentUrl}?${queryParam}`;
    }
}

const base64Encode = (encodeData) => {
    const buff = new Buffer(encodeData);
    return buff.toString('base64');
};

module.exports = EbayOauthToken;
