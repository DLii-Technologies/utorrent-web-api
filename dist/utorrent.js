"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse = __importStar(require("./parse"));
const model_cache_1 = require("./core/model_cache");
const torrent_1 = require("./models/torrent");
const utils_1 = require("./utils");
const utserver_1 = require("./core/utserver");
const types_1 = require("./types");
class uTorrent extends utserver_1.UtServer {
    constructor() {
        super(...arguments);
        /**
         * Create the torrent cache
         */
        this.__torrentCache = new model_cache_1.ModelCache(torrent_1.Torrent, this);
        // Accessors/Mutators --------------------------------------------------------------------------
    }
    /**
     * Parse the torrent input
     */
    parseTorrentInput(torrents) {
        let hashes = [];
        if (Array.isArray(torrents)) {
            for (let torrent of torrents) {
                if (typeof torrent == "string") {
                    hashes.push(torrent);
                }
                else {
                    hashes.push(torrent.hash);
                }
            }
        }
        else if (typeof torrents == "string") {
            hashes.push(torrents);
        }
        else if (torrents instanceof torrent_1.Torrent) {
            hashes.push(torrents.hash);
        }
        else {
            hashes = Object.keys(torrents.torrents);
        }
        return hashes;
    }
    /**
     * Execute an action on a list of torrents and update them
     */
    executeTorrentAction(torrents, action) {
        let hashes = this.parseTorrentInput(torrents);
        return new Promise((resolve, reject) => {
            this.execute(action, { hash: hashes, list: 1 }).then((body) => {
                let torrents = JSON.parse(body)["torrents"];
                this.__torrentCache.update(torrents);
                resolve();
            }).catch(reject);
        });
    }
    // Methods -------------------------------------------------------------------------------------
    /**
     * Add a torrent via URL and get its hash
     */
    addUrl(url) {
        return new Promise((resolve, reject) => {
            utils_1.TorrentUtils.hashFromUrl(url).then((hash) => {
                this.execute(types_1.Action.AddUrl, { s: url }).then(() => {
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
            this.execute(types_1.Action.List).then((data) => {
                let list = JSON.parse(data);
                resolve({
                    cache_id: list["torrentc"],
                    labels: {},
                    torrents: this.__torrentCache.update(list["torrents"]).all(),
                    rss_feeds: parse.rssFeeds(list["rssfeeds"]),
                    rss_filters: parse.rssFilters(list["rssfilters"]),
                });
            }).catch(reject);
        });
    }
    /**
     * Get the files associated with a torrent
     */
    files(torrents) {
        let hashes = this.parseTorrentInput(torrents);
        return new Promise((resolve, reject) => {
            this.execute(types_1.Action.GetFiles, { hash: hashes }).then((body) => {
                let result = {};
                let fileInfo = JSON.parse(body)["files"];
                // 0 => hash, 1 => data, 2 => hash, 3 => data...
                for (let i = 0; i < fileInfo.length; i += 2) {
                    let torrent = this.__torrentCache.fetch(fileInfo[i]);
                    result[torrent.hash] = Object.values(torrent.__setFileData(fileInfo[i + 1]));
                }
                resolve(result);
            }).catch(reject);
        });
    }
    /**
     * Pause the torrent
     */
    pause(torrents) {
        return this.executeTorrentAction(torrents, types_1.Action.Pause);
    }
    /**
     * Refresh the torrent list
     */
    refresh() {
        return new Promise((resolve, reject) => {
            this.list().then(() => {
                resolve();
            }).catch(reject);
        });
    }
    /**
     * Remove the torrents from uTorrent.
     *
     * @param {Array<Torrent|string>} torrents Array of torrent objects/info hashes
     */
    remove(torrents, flags = torrent_1.RemoveFlag.JobOnly) {
        switch (flags) {
            case torrent_1.RemoveFlag.WithTorrent:
                return this.executeTorrentAction(torrents, types_1.Action.RemoveTorrent);
            case torrent_1.RemoveFlag.WithData:
                return this.executeTorrentAction(torrents, types_1.Action.RemoveData);
            case torrent_1.RemoveFlag.WithTorrent | torrent_1.RemoveFlag.WithData:
                return this.executeTorrentAction(torrents, types_1.Action.RemoveTorrentData);
            default:
                return this.executeTorrentAction(torrents, types_1.Action.Remove);
        }
    }
    /**
     * Start the torrent
     */
    start(torrents, force = false) {
        if (force) {
            return this.executeTorrentAction(torrents, types_1.Action.ForceStart);
        }
        return this.executeTorrentAction(torrents, types_1.Action.Start);
    }
    /**
     * Stop the torrent
     */
    stop(torrents) {
        return this.executeTorrentAction(torrents, types_1.Action.Stop);
    }
    /**
     * Unpause the torrent
     */
    unpause(torrents) {
        return this.executeTorrentAction(torrents, types_1.Action.Unpause);
    }
    /**
     * Get the version of uTorrent
     */
    version() { }
}
exports.uTorrent = uTorrent;
//# sourceMappingURL=utorrent.js.map