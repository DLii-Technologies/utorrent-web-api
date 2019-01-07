"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type mappings are currently broken... Use standard JavaScript for new.
 */
const parseTorrent = require("parse-torrent");
/**
 * Fetch the torrent's hash
 */
function hashFromUrl(url) {
    return new Promise((resolve, reject) => {
        try {
            resolve(parseTorrent(url).infoHash);
        }
        catch (e) {
            parseTorrent.remote(url, (err, info) => {
                if (err || !info) {
                    reject(err);
                }
                else {
                    resolve(info.infoHash.toUpperCase());
                }
            });
        }
    });
}
exports.hashFromUrl = hashFromUrl;
//# sourceMappingURL=torrent.js.map