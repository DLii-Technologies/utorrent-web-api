"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const errors_1 = require("./errors");
const utils_1 = require("./utils");
const network = __importStar(require("./network"));
const parse = __importStar(require("./parse"));
// BaseUri = "http://[IP]:[PORT]/gui/";
// `http://[IP]:[PORT]/gui/?action=[ACTION]&hash=[TORRENT HASH 1]&hash=[TORRENT HASH 2]&...`
class uTorrent {
    /**
     * Create a new instance of uTorrent
     */
    constructor(host, port = 8080, username, password) {
        /**
         * uTorrent information
         */
        this.__host = "";
        this.__port = 8080;
        /**
         * The login credentials
         */
        this.__credentials = {
            username: "",
            password: ""
        };
        this.__cookieJar = request_1.default.jar();
        this.setAddress(host, port);
        this.setCredentials(username, password);
    }
    /**
     * Generate a URL
     */
    url(path = "") {
        return `http://${this.__host}:${this.__port}/gui/${path}`;
    }
    /**
     * Send a request. If it fails, regenerate the token and try again.
     */
    request(options, retry = true) {
        // Add auth and cookies to request
        options.auth = {
            user: this.__credentials.username,
            pass: this.__credentials.password,
            sendImmediately: false
        };
        options.jar = this.__cookieJar;
        // Execute the request
        return new Promise((resolve, reject) => {
            network.sendRequest(options).then(resolve)
                .catch((error) => {
                if (error instanceof errors_1.TokenError && retry) {
                    this.fetchToken().then((token) => {
                        options.qs.token = this.__token;
                        this.request(options, false).then(resolve).catch(reject);
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
            let options = network.defaultOptions({
                uri: this.url("token.html")
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
            options = network.formOptions(params, {
                uri: this.url(),
                qs: { action: action }
            });
        }
        else {
            options = network.defaultOptions({
                uri: this.url(),
                qs: Object.assign(params, action == "list" ? { list: 1 } : { action: action })
            });
        }
        options.qs.token = this.__token;
        return this.request(options);
    }
    // Methods -------------------------------------------------------------------------------------
    /**
     * Add a torrent via URL
     */
    addUrl(url) {
        return new Promise((resolve, reject) => {
            utils_1.torrentUrlHash(url).then((hash) => {
                this.execute("add-url", { s: url }).then(() => {
                    resolve(hash);
                }).catch(reject);
            }).catch(reject);
        });
    }
    /**
     * List the torrents currently in uTorrent
     */
    list() {
        return new Promise((resolve, reject) => {
            this.execute("list").then((data) => {
                let list = JSON.parse(data);
                let result = {
                    build: list["build"],
                    cache_id: list["torrentc"],
                    labels: {},
                    torrents: parse.torrents(list["torrents"]),
                    rss_feeds: parse.rssFeeds(list["rssfeeds"]),
                    rss_filters: parse.rssFilters(list["rssfilters"]),
                };
                resolve(result);
            }).catch(reject);
        });
    }
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
        this.__credentials.password = password || "";
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
        this.__credentials.username = username || "";
    }
}
exports.uTorrent = uTorrent;
//# sourceMappingURL=utorrent.js.map