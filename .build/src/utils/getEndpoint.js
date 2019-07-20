"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = {
    production: 'http://localhost:3001/graphql',
};
function getEndpoint(environment) {
    return endpoints[environment] || 'http://localhost:3001/graphql';
}
exports.getEndpoint = getEndpoint;
//# sourceMappingURL=getEndpoint.js.map