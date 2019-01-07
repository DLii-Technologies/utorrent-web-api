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
class uTorrent extends utserver_1.UtServer {
    constructor() {
        super(...arguments);
        /**
         * Create the torrent cache
         */
        this.__torrentCache = new model_cache_1.ModelCache(torrent_1.Torrent, this);
        // Accessors/Mutators --------------------------------------------------------------------------
    }
    // Methods -------------------------------------------------------------------------------------
    /**
     * Add a torrent via URL and get its hash
     */
    addUrl(url) {
        return new Promise((resolve, reject) => {
            utils_1.TorrentUtils.hashFromUrl(url).then((hash) => {
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
     * Get the version of uTorrent
     */
    version() { }
}
exports.uTorrent = uTorrent;
//# sourceMappingURL=utorrent.js.map