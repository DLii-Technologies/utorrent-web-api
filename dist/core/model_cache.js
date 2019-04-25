"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A cache used to add new, update existing, and remove unused object instances.
 */
class ModelCache {
    /**
     * Create the model cache
     */
    constructor(model, ...args) {
        this.__model = model;
        this.__args = args;
        this.__set = {};
    }
    /**
     * Create a new model instance
     */
    create(model, args) {
        return new model(...this.__args);
    }
    /**
     * Fetch all elements in the cache
     */
    all() {
        return Object.assign({}, this.__set);
    }
    /**
     * Fetch an existing object and update it.
     * If it doesn't exist, create it
     * (Assumes first item in data is ID)
     */
    fetch(id) {
        let item = this.__set[id];
        if (item === undefined) {
            item = this.create(this.__model, this.__args);
            this.__set[id] = item;
        }
        return item;
    }
    /**
     * Update the cache
     */
    update(data) {
        let ids = Object.assign({}, this.__set);
        for (let modelData of data) {
            let item = this.fetch(modelData[0]);
            item.__setData(modelData);
            delete ids[modelData[0]];
        }
        for (let id in ids) {
            delete this.__set[id];
        }
        return this;
    }
}
exports.ModelCache = ModelCache;
//# sourceMappingURL=model_cache.js.map