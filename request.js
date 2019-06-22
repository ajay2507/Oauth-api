'use strict';
const https = require('https');
'use strict';
const postRequest = (data, ebayAuthToken) => {
    const encodedStr = base64Encode(ebayAuthToken.clientId + ':' + ebayAuthToken.clientSecret);
    const auth = 'Basic ' + encodedStr;
    return new Promise((resolve, reject) => {
        const request = https.request({
            headers: {
                'Content-Length': data.length,
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': auth
            },
            path: '/identity/v1/oauth2/token',
            hostname: ebayAuthToken.baseUrl,
            method: 'POST'
        });
        request.on('response', (response) => {
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
};

const base64Encode = (encodeData) => {
    const buff = new Buffer(encodeData);
    return buff.toString('base64');
};

console.log(base64Encode("aprathap:Awesomeajay_123"));

module.exports = postRequest;
