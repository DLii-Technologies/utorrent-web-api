"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const types_1 = require("../types");
const model_cache_1 = require("../core/model_cache");
const file_1 = require("./file");
var RemoveFlag;
(function (RemoveFlag) {
    RemoveFlag[RemoveFlag["JobOnly"] = 0] = "JobOnly";
    RemoveFlag[RemoveFlag["WithTorrent"] = 1] = "WithTorrent";
    RemoveFlag[RemoveFlag["WithData"] = 2] = "WithData";
})(RemoveFlag = exports.RemoveFlag || (exports.RemoveFlag = {}));
class Torrent extends model_1.Model {
    constructor(utorrent) {
        super();
        /**
         * Store the associated files
         */
        this.__fileCache = new model_cache_1.ModelCache(file_1.File, this);
        this.__utorrent = utorrent;
    }
    /**
     * Update the corrent information
     */
    __setData(info) {
        this.__torrent = {
            hash: info[0],
            status: info[1],
            name: info[2],
            size: info[3],
            progress: info[4] / 1000,
            downloaded: info[5],
            uploaded: info[6],
            ratio: info[7] / 1000,
            upload_speed: info[8],
            download_speed: info[9],
            time_remaining: info[10],
            label: info[11],
            peers_connected: info[12],
            peers_in_swarm: info[13],
            seeds_connected: info[14],
            seeds_in_swarm: info[15],
            availability: info[16],
            queue_order: info[18],
            download_url: info[19],
            rss_feed_url: info[20],
            status_message: info[21],
            stream_id: info[22],
            date_added: info[23],
            date_completed: info[24],
            app_update_url: info[25]
        };
    }
    /**
     * Update the file data and return the files
     */
    __setFileData(info) {
        let files = [];
        for (let i = 0; i < info.length; i++) {
            let finalData = [i].concat(info[i]);
            files.push(finalData);
        }
        return this.__fileCache.update(files).all();
    }
    /**
     * Get the files associated with the torrent
     */
    files() {
        return new Promise((resolve, reject) => {
            this.__utorrent.files(this).then((files) => {
                resolve(files[this.hash]);
            }).catch(reject);
        });
    }
    /**
     * Set the priority of the given file(s)
     */
    setFilePriority(files, priority) {
        let indices = [];
        if (Array.isArray(files)) {
            for (let file of files) {
                indices.push(file.id);
            }
        }
        else {
            indices.push(files.id);
        }
        return new Promise((resolve, reject) => {
            this.__utorrent.execute(types_1.Action.SetFilePriority, {
                hash: this.hash,
                f: indices,
                p: priority
            }).then(() => {
                for (let index of indices) {
                    this.__fileCache.fetch(index).__setPriority(priority);
                }
                resolve();
            }).catch(reject);
        });
    }
    // Methods -------------------------------------------------------------------------------------
    /**
     * Pause the torrent
     */
    pause() {
        return this.__utorrent.pause(this);
    }
    /**
     * Refresh the current torrent
     */
    refresh() {
        return new Promise((resolve, reject) => {
            this.__utorrent.refresh().then(resolve).catch(reject);
        });
    }
    /**
     * Remove the torrent from uTorrent
     */
    remove(flags = RemoveFlag.JobOnly) {
        return this.__utorrent.remove(this, flags);
    }
    /**
     * Start the torrent
     */
    start(force = false) {
        return this.__utorrent.start(this, force);
    }
    /**
     * Stop the torrent
     */
    stop() {
        return this.__utorrent.stop(this);
    }
    /**
     * Unpause the torrent
     */
    unpause() {
        return this.__utorrent.unpause(this);
    }
    // Accessors -----------------------------------------------------------------------------------
    /**
     * Get the app update URL (whatever that is...)
     */
    get appUpdateUrl() {
        return this.__torrent.app_update_url;
    }
    /**
     * Get the availability of the torrent (whatever that is as well)
     */
    get availability() {
        return this.__torrent.availability;
    }
    /**
     * Get the date the torrent was added
     */
    get dateAdded() {
        return new Date(this.__torrent.date_added);
    }
    /**
     * Get the date the torrent was completed
     */
    get dateCompleted() {
        return new Date(this.__torrent.date_completed);
    }
    /**
     * The amount of data downloaded (bytes)
     */
    get downloaded() {
        return this.__torrent.downloaded;
    }
    /**
     * The download speed (bytes per second)
     */
    get downloadSpeed() {
        return this.__torrent.download_speed;
    }
    /**
     * Get the download URL if it exists
     */
    get downloadUrl() {
        return this.__torrent.download_url || null;
    }
    /**
     * Get the estimated time remaining (seconds)
     */
    get eta() {
        return this.__torrent.time_remaining;
    }
    /**
     * The torrent's hash
     */
    get hash() {
        return this.__torrent.hash;
    }
    /**
     * The torrent's label if set
     */
    get label() {
        return this.__torrent.label || null;
    }
    /**
     * The name of the torrent
     */
    get name() {
        return this.__torrent.name;
    }
    /**
     * The number of peers connected
     */
    get peersConnected() {
        return this.__torrent.peers_connected;
    }
    /**
     * The peers in the swarm
     */
    get peersInSwarm() {
        return this.__torrent.peers_in_swarm;
    }
    /**
     * The progress of the torrent
     */
    get progress() {
        return this.__torrent.progress;
    }
    /**
     * The queue order of the torrent
     */
    get queueOrder() {
        return this.__torrent.queue_order;
    }
    /**
     * The upload/download ratio of the torrent
     */
    get ratio() {
        return this.__torrent.ratio;
    }
    /**
     * The RSS feed URL
     */
    get rssFeedUrl() {
        return this.__torrent.rss_feed_url;
    }
    /**
     * The number of seeds connected
     */
    get seedsConnected() {
        return this.__torrent.seeds_connected;
    }
    /**
     * The number of seeds in the swarm
     */
    get seedsInSwarm() {
        return this.__torrent.seeds_in_swarm;
    }
    /**
     * The total size of the files
     */
    get size() {
        return this.__torrent.size;
    }
    /**
     * The status of the torrent
     */
    get status() {
        return this.__torrent.status;
    }
    /**
     * The status message of the torrent
     */
    get statusMessage() {
        return this.__torrent.status_message;
    }
    /**
     * The stream ID of the torrent
     */
    get streamId() {
        return this.__torrent.stream_id;
    }
    /**
     * The amount of data uploaded (bytes)
     */
    get uploaded() {
        return this.__torrent.uploaded;
    }
    /**
     * The upload speed (bytes per second)
     */
    get uploadSpeed() {
        return this.__torrent.upload_speed;
    }
}
exports.Torrent = Torrent;
//# sourceMappingURL=torrent.js.map