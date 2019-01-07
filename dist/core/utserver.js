"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const errors_1 = require("../errors");
const utils_1 = require("../utils");
class UtServer {
    /**
     * Create a new instance of uTorrent
     */
    constructor(host, port = 8080, username, password) {
        /**
         * uTorrent information
         */
        this.__host = "";
        this.__port = 8080;
        this.__username = "";
        this.__password = "";
        this.__cookieJar = request_1.default.jar();
        this.setAddress(host, port);
        this.setCredentials(username, password);
    }
    /**
     * Send an HTTP request
     */
    sendRequest(options) {
        options.qs.token = this.__token;
        return new Promise((resolve, reject) => {
            request_1.default(options, (error, response, body) => {
                error = utils_1.NetworkUtils.validateUtServerResponse(error, response, body);
                if (error) {
                    reject(error);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
    /**
     * Send a request. If it fails, regenerate the token and try again.
     */
    request(options, retry = true) {
        // Add auth credentials and set the proper URI
        options.auth = {
            user: this.__username,
            pass: this.__password,
            sendImmediately: false
        };
        options.jar = this.__cookieJar;
        options.uri = `http://${this.__host}:${this.__port}/gui/${options.uri || ""}`;
        // Execute the request
        return new Promise((resolve, reject) => {
            this.sendRequest(options).then(resolve).catch((error) => {
                // If a token error occurred, then a new token should be generated and try again
                if (error instanceof errors_1.TokenError && retry) {
                    this.fetchToken().then(() => {
                        this.sendRequest(options).then(resolve).catch(reject);
                    }).catch(reject);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    /**
     * Fetch a CSRF token
     */
    fetchToken() {
        return new Promise((resolve, reject) => {
            let options = utils_1.NetworkUtils.defaultOptions({
                uri: "token.html"
            });
            this.request(options, false).then((body) => {
                let token = body.replace(/<[^<]*>/g, "").trim();
                if (!token) {
                    reject(new errors_1.TokenError("Failed to retrieve token"));
                }
                else {
                    this.__token = token;
                    resolve(token);
                }
            }).catch(reject);
        });
    }
    /**
     * Execute an action on uTorrent
     */
    execute(action, params = {}) {
        let options;
        if (action == "add-file") {
            options = utils_1.NetworkUtils.formOptions(params, {
                qs: { action: action }
            });
        }
        else {
            options = utils_1.NetworkUtils.defaultOptions({
                qs: Object.assign(params, action == "list" ? { list: 1 } : { action: action })
            });
        }
        return this.request(options);
    }
    // Accessors/Mutators --------------------------------------------------------------------------
    /**
     * Set the connection address
     */
    setAddress(host, port) {
        this.setHost(host);
        this.setPort(port);
        return this;
    }
    /**
     * Set the login credentials
     */
    setCredentials(username, password) {
        this.setUsername(username);
        this.setPassword(password);
        return this;
    }
    /**
     * Set the connection host
     */
    setHost(host) {
        this.__host = host;
        return this;
    }
    /**
     * Set the login password
     */
    setPassword(password) {
        this.__password = password || "";
    }
    /**
     * Set the connection port
     */
    setPort(port) {
        this.__port = port;
        return this;
    }
    /**
     * Set the login username
     */
    setUsername(username) {
        this.__username = username || "";
    }
}
exports.UtServer = UtServer;
//# sourceMappingURL=utserver.js.map