"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Api_1 = require("../Api");
describe('constructor', function () {
    it('should throw an error if <baseURL> parameter is missing', function () {
        // @ts-ignore - Expected too few arguments error
        expect(function () { return new Api_1.Api(); }).toThrow('Missing baseURL parameter');
    });
    it('should throw an error if <refreshToken> parameter is missing', function () {
        // @ts-ignore - Expected too few arguments error
        expect(function () { return new Api_1.Api('https://some-url.com'); }).toThrow('Missing refreshToken parameter');
    });
});
