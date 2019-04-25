import { Priority } from "types";
import { Model } from "../models/model";
import { Torrent } from "./torrent";
export declare class File extends Model {
    /**
     * The torrent that the file belongs to
     */
    private __torrent;
    /**
     * Store the file data
     */
    private __file;
    /**
     * Create the file instance
     */
    constructor(torrent: Torrent);
    /**
     * Set the file data
     */
    __setData(data: any[]): void;
    /**
     * Update the priority of the torrent
     */
    __setPriority(priority: Priority): void;
    /**
     * Refresh the torrent
     */
    refresh(): Promise<void>;
    /**
     * Set the file priority
     */
    setPriority(priority: Priority): Promise<void>;
    /**
     * Get the file ID (index)
     */
    readonly id: number;
    /**
     * An alias for ID
     */
    readonly index: number;
    /**
     * The name of the file
     */
    readonly name: string;
    /**
     * The size of the file (in bytes)
     */
    readonly size: number;
    /**
     * The amount of data downloaded (in bytes)
     */
    readonly downloaded: number;
    /**
     * The priority of the file
     */
    readonly priority: Priority;
    /**
     * The first piece
     */
    readonly firstPiece: number;
    /**
     * The number of pieces
     */
    readonly numberOfPieces: number;
    /**
     * Indicate if the file is streamable
     */
    readonly streamable: boolean;
    /**
     * The encoded rate
     */
    readonly encodedRate: number;
    /**
     * The duration of the file
     */
    readonly duration: number;
    /**
     * The width of the file
     */
    readonly width: number;
    /**
     * The height of the file
     */
    readonly height: number;
    /**
     * The ETA to stream
     */
    readonly streamEta: number;
    /**
     * The streamability of the file
     */
    readonly streamability: number;
}
