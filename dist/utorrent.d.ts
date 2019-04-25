import { RemoveFlag } from "./models/torrent";
import { UtServer } from "./core/utserver";
import { ITorrentList, Action, TorrentInput, IFileList } from "./types";
export declare class uTorrent extends UtServer {
    /**
     * Create the torrent cache
     */
    private __torrentCache;
    /**
     * Parse the torrent input
     */
    protected parseTorrentInput(torrents: TorrentInput): string[];
    /**
     * Execute an action on a list of torrents and update them
     */
    protected executeTorrentAction(torrents: TorrentInput, action: Action): Promise<void>;
    /**
     * Add a torrent via URL and get its hash
     */
    addUrl(url: string): Promise<string>;
    /**
     * List the torrents currently in uTorrent
     */
    list(): Promise<ITorrentList>;
    /**
     * Get the files associated with a torrent
     */
    files(torrents: TorrentInput): Promise<IFileList>;
    /**
     * Pause the torrent
     */
    pause(torrents: TorrentInput): Promise<void>;
    /**
     * Refresh the torrent list
     */
    refresh(): Promise<void>;
    /**
     * Remove the torrents from uTorrent.
     *
     * @param {Array<Torrent|string>} torrents Array of torrent objects/info hashes
     */
    remove(torrents: TorrentInput, flags?: RemoveFlag): Promise<void>;
    /**
     * Start the torrent
     */
    start(torrents: TorrentInput, force?: boolean): Promise<void>;
    /**
     * Stop the torrent
     */
    stop(torrents: TorrentInput): Promise<void>;
    /**
     * Unpause the torrent
     */
    unpause(torrents: TorrentInput): Promise<void>;
    /**
     * Get the version of uTorrent
     */
    version(): void;
}
