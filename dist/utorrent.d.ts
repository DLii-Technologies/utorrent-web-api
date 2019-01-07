import { UtServer } from "./core/utserver";
import { ITorrentList } from "./types";
export declare class uTorrent extends UtServer {
    /**
     * Create the torrent cache
     */
    private __torrentCache;
    /**
     * Add a torrent via URL and get its hash
     */
    addUrl(url: string): Promise<string>;
    /**
     * List the torrents currently in uTorrent
     */
    list(): Promise<ITorrentList>;
    /**
     * Get the version of uTorrent
     */
    version(): void;
}
