import { Model } from "./model";
import { Priority } from "../types";
import { File } from "./file";
import { uTorrent } from "../utorrent";
export declare enum RemoveFlag {
    JobOnly = 0,
    WithTorrent = 1,
    WithData = 2
}
export declare class Torrent extends Model {
    /**
     * Store the uTorrent instance
     */
    private __utorrent;
    /**
     * Store all of the torrent information
     */
    private __torrent;
    /**
     * Store the associated files
     */
    private __fileCache;
    constructor(utorrent: uTorrent);
    /**
     * Update the corrent information
     */
    __setData(info: any): void;
    /**
     * Update the file data and return the files
     */
    __setFileData(info: Array<any[]>): {
        [id: string]: File;
    };
    /**
     * Get the files associated with the torrent
     */
    files(): Promise<File[]>;
    /**
     * Set the priority of the given file(s)
     */
    setFilePriority(files: File | Array<File>, priority: Priority): Promise<void>;
    /**
     * Pause the torrent
     */
    pause(): Promise<void>;
    /**
     * Refresh the current torrent
     */
    refresh(): Promise<void>;
    /**
     * Remove the torrent from uTorrent
     */
    remove(flags?: RemoveFlag): Promise<void>;
    /**
     * Start the torrent
     */
    start(force?: boolean): Promise<void>;
    /**
     * Stop the torrent
     */
    stop(): Promise<void>;
    /**
     * Unpause the torrent
     */
    unpause(): Promise<void>;
    /**
     * Get the app update URL (whatever that is...)
     */
    readonly appUpdateUrl: string;
    /**
     * Get the availability of the torrent (whatever that is as well)
     */
    readonly availability: number;
    /**
     * Get the date the torrent was added
     */
    readonly dateAdded: Date;
    /**
     * Get the date the torrent was completed
     */
    readonly dateCompleted: Date;
    /**
     * The amount of data downloaded (bytes)
     */
    readonly downloaded: number;
    /**
     * The download speed (bytes per second)
     */
    readonly downloadSpeed: number;
    /**
     * Get the download URL if it exists
     */
    readonly downloadUrl: string | null;
    /**
     * Get the estimated time remaining (seconds)
     */
    readonly eta: number;
    /**
     * The torrent's hash
     */
    readonly hash: string;
    /**
     * The torrent's label if set
     */
    readonly label: string | null;
    /**
     * The name of the torrent
     */
    readonly name: string;
    /**
     * The number of peers connected
     */
    readonly peersConnected: number;
    /**
     * The peers in the swarm
     */
    readonly peersInSwarm: number;
    /**
     * The progress of the torrent
     */
    readonly progress: number;
    /**
     * The queue order of the torrent
     */
    readonly queueOrder: number;
    /**
     * The upload/download ratio of the torrent
     */
    readonly ratio: number;
    /**
     * The RSS feed URL
     */
    readonly rssFeedUrl: string;
    /**
     * The number of seeds connected
     */
    readonly seedsConnected: number;
    /**
     * The number of seeds in the swarm
     */
    readonly seedsInSwarm: number;
    /**
     * The total size of the files
     */
    readonly size: number;
    /**
     * The status of the torrent
     */
    readonly status: import("../types").TorrentStatus;
    /**
     * The status message of the torrent
     */
    readonly statusMessage: string;
    /**
     * The stream ID of the torrent
     */
    readonly streamId: string;
    /**
     * The amount of data uploaded (bytes)
     */
    readonly uploaded: number;
    /**
     * The upload speed (bytes per second)
     */
    readonly uploadSpeed: number;
}
