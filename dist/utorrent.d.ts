import request from "request";
import { TorrentList } from "./types";
export declare class uTorrent {
    /**
     * uTorrent information
     */
    private __host;
    private __port;
    private __token?;
    /**
     * The login credentials
     */
    private __credentials;
    /**
     * The cookie jar
     */
    private __cookieJar;
    /**
     * Create a new instance of uTorrent
     */
    constructor(host: string, port?: number, username?: string, password?: string);
    /**
     * Generate a URL
     */
    protected url(path?: string): string;
    /**
     * Send a request. If it fails, regenerate the token and try again.
     */
    protected request(options: request.CoreOptions & request.UriOptions, retry?: boolean): Promise<string>;
    /**
     * Fetch a CSRF token
     */
    protected fetchToken(): Promise<string>;
    /**
     * Execute an action on uTorrent
     */
    protected execute(action: string, params?: any): Promise<string>;
    /**
     * Add a torrent via URL
     */
    addUrl(url: string): Promise<string>;
    /**
     * List the torrents currently in uTorrent
     */
    list(): Promise<TorrentList>;
    /**
     * Set the connection address
     */
    setAddress(host: string, port: number): this;
    /**
     * Set the login credentials
     */
    setCredentials(username?: string, password?: string): this;
    /**
     * Set the connection host
     */
    setHost(host: string): this;
    /**
     * Set the login password
     */
    setPassword(password?: string): void;
    /**
     * Set the connection port
     */
    setPort(port: number): this;
    /**
     * Set the login username
     */
    setUsername(username?: string): void;
}
