"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    /**
     * Create the data manager
     */
    constructor(utorrent) {
        this.__utorrent = utorrent;
    }
    /**
     * Get the uTorrent instance
     */
    utorrent() {
        return this.__utorrent;
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map