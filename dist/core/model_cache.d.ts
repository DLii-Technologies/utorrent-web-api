import { Model } from "./model";
/**
 * A cache used to add new, update existing, and remove unused object instances.
 */
export declare class ModelCache<T extends Model> {
    /**
     * The arguments to send to the models
     */
    private __args;
    /**
     * Store the model type
     */
    private __model;
    /**
     * The set that contains the cached items
     */
    private __set;
    /**
     * Create the model cache
     */
    constructor(model: {
        new (...args: any[]): T;
    }, ...args: any[]);
    /**
     * Create a new model instance
     */
    protected create(model: {
        new (...args: any[]): T;
    }, args: any[]): T;
    /**
     * Fetch all elements in the cache
     */
    all(): {
        [id: string]: T;
    };
    /**
     * Fetch an existing object and update it.
     * If it doesn't exist, create it
     * (Assumes first item in data is ID)
     */
    fetch(data?: any): T;
    /**
     * Update the cache
     */
    update(data: any[]): this;
}
