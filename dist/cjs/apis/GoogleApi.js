"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Api_1 = require("./Api");
var constants_1 = require("./constants");
/*
 * Return an Api instance for Google
 */
var GoogleApi = /** @class */ (function (_super) {
    __extends(GoogleApi, _super);
    function GoogleApi(refreshToken, opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, constants_1.ORIGINS.GOOGLE, refreshToken, opts) || this;
    }
    return GoogleApi;
}(Api_1.Api));
exports.GoogleApi = GoogleApi;
