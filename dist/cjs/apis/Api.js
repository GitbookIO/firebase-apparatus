"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("./constants");
var getOAuthToken_1 = require("./getOAuthToken");
/*
 * Main interface for an API
 */
var Api = /** @class */ (function () {
    function Api(baseURL, refreshToken, opts) {
        if (opts === void 0) { opts = {}; }
        this.accessToken = null;
        if (!baseURL) {
            throw new Error('Missing baseURL parameter');
        }
        if (!refreshToken) {
            throw new Error('Missing refreshToken parameter');
        }
        // Set the refreshToken for requests
        this.refreshToken = refreshToken;
        // Create the axios client
        this.client = axios_1.default.create(__assign({}, opts, { baseURL: baseURL }));
        // Default request headers
        this.client.defaults.headers.common['User-Agent'] =
            'FirebaseCLI/3.15.4';
        this.client.defaults.headers.common['X-Client-Version'] =
            'FirebaseCLI/3.15.4';
        this.client.defaults.headers.post['Content-Type'] = 'application/json';
    }
    // Use last fetched access token or get a new one if necessary
    Api.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var googleAccessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Validate that accessToken is valid
                        if (!!this.accessToken &&
                            this.accessToken.refreshToken === this.refreshToken &&
                            this.accessToken.expiresAt > Date.now() + constants_1.FIVE_MINUTES) {
                            return [2 /*return*/, this.accessToken.token];
                        }
                        return [4 /*yield*/, getOAuthToken_1.getOAuthToken(this.refreshToken)];
                    case 1:
                        googleAccessToken = _a.sent();
                        this.accessToken = {
                            token: googleAccessToken.access_token,
                            refreshToken: this.refreshToken,
                            expiresAt: Date.now() + googleAccessToken.expires_in * 1000
                        };
                        return [2 /*return*/, this.accessToken.token];
                }
            });
        });
    };
    // Make an authed request
    Api.prototype.request = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var token, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.client.request(__assign({}, opts, { headers: __assign({}, opts.headers, { Authorization: "Bearer " + token }) }))];
                    case 3:
                        data = (_a.sent()).data;
                        // Return data only
                        return [2 /*return*/, data];
                    case 4:
                        error_1 = _a.sent();
                        // Invalid response
                        if (error_1.response) {
                            throw new Error(error_1.response.data.error.message);
                        }
                        // No response
                        if (error_1.request) {
                            throw new Error("No response receveid for " + error_1.config.method + " request to " + error_1.config.url);
                        }
                        // Invalid request
                        throw new Error("Error setting up request with " + error_1.config);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // GET <url>
    Api.prototype.get = function (url, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(__assign({}, opts, { method: 'get', url: url }))];
            });
        });
    };
    // POST <url> with <data>
    Api.prototype.post = function (url, data, opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(__assign({}, opts, { method: 'post', url: url,
                        data: data }))];
            });
        });
    };
    return Api;
}());
exports.Api = Api;
