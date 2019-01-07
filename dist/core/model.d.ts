import { uTorrent } from "utorrent";
export declare abstract class Model {
    /**
     * Store the uTorrent instance
     */
    private __utorrent;
    /**
     * Create the data manager
     */
    constructor(utorrent: uTorrent);
    /**
     * Set the data
     */
    abstract setData(data: any): void;
    /**
     * Get the uTorrent instance
     */
    protected utorrent(): uTorrent;
}
