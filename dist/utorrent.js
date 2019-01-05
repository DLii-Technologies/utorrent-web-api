"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// BaseUri = "http://[IP]:[PORT]/gui/";
// `http://[IP]:[PORT]/gui/?action=[ACTION]&hash=[TORRENT HASH 1]&hash=[TORRENT HASH 2]&...`
class uTorrent {
    /**
     * Create a new instance of uTorrent
     */
    constructor(host, port = 8080, username, password) {
        this.__host = "";
        this.__port = 8080;
        this.__username = "";
        this.__password = "";
        this.setAddress(host, port);
        this.setCredentials(username, password);
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
        this.__username = username;
    }
}
exports.uTorrent = uTorrent;
//# sourceMappingURL=utorrent.js.map