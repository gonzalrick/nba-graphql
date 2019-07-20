"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function response(body, statusCode = 200) {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: body ? JSON.stringify(body) : '',
        statusCode,
    };
}
exports.response = response;
function error(errors, statusCode = 400) {
    // Report error the the lambda logs
    console.error(errors); // eslint-disable-line no-console
    return response({ errors }, statusCode);
}
exports.error = error;
function success(data, statusCode = 200) {
    return response(data, statusCode);
}
exports.success = success;
//# sourceMappingURL=response.js.map