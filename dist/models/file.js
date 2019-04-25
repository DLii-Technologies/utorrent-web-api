"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../models/model");
class File extends model_1.Model {
    /**
     * Create the file instance
     */
    constructor(torrent) {
        super();
        this.__torrent = torrent;
    }
    /**
     * Set the file data
     */
    __setData(data) {
        this.__file = {
            id: data[0],
            name: data[1],
            size: data[2],
            downloaded: data[3],
            priority: data[4],
            first_piece: data[5],
            num_pieces: data[6],
            streamable: data[7],
            encoded_rate: data[8],
            duration: data[9],
            width: data[10],
            height: data[11],
            stream_eta: data[12],
            streamability: data[13]
        };
    }
    /**
     * Update the priority of the torrent
     */
    __setPriority(priority) {
        this.__file.priority = priority;
    }
    /**
     * Refresh the torrent
     */
    refresh() {
        return new Promise((resolve, reject) => {
            this.__torrent.files().then(() => {
                resolve();
            }).catch(reject);
        });
    }
    /**
     * Set the file priority
     */
    setPriority(priority) {
        return this.__torrent.setFilePriority(this, priority);
    }
    // Accessors -----------------------------------------------------------------------------------
    /**
     * Get the file ID (index)
     */
    get id() {
        return this.__file.id;
    }
    /**
     * An alias for ID
     */
    get index() {
        return this.id;
    }
    /**
     * The name of the file
     */
    get name() {
        return this.__file.name;
    }
    /**
     * The size of the file (in bytes)
     */
    get size() {
        return this.__file.size;
    }
    /**
     * The amount of data downloaded (in bytes)
     */
    get downloaded() {
        return this.__file.downloaded;
    }
    /**
     * The priority of the file
     */
    get priority() {
        return this.__file.priority;
    }
    /**
     * The first piece
     */
    get firstPiece() {
        return this.__file.first_piece;
    }
    /**
     * The number of pieces
     */
    get numberOfPieces() {
        return this.__file.num_pieces;
    }
    /**
     * Indicate if the file is streamable
     */
    get streamable() {
        return this.__file.streamable;
    }
    /**
     * The encoded rate
     */
    get encodedRate() {
        return this.__file.encoded_rate;
    }
    /**
     * The duration of the file
     */
    get duration() {
        return this.__file.duration;
    }
    /**
     * The width of the file
     */
    get width() {
        return this.__file.width;
    }
    /**
     * The height of the file
     */
    get height() {
        return this.__file.height;
    }
    /**
     * The ETA to stream
     */
    get streamEta() {
        return this.__file.stream_eta;
    }
    /**
     * The streamability of the file
     */
    get streamability() {
        return this.__file.streamability;
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map