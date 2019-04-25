import { Action } from "../types";
/**
 * Manage the uTorrent server
 */
export declare class UtServer {
    /**
     * uTorrent information
     */
    private __host;
    private __port;
    private __username;
    private __password;
    private __token?;
    /**
     * The cookie jar
     */
    private __cookieJar;
    /**
     * Create a new instance of uTorrent
     */
    constructor(host: string, port?: number, username?: string, password?: string);
    /**
     * Send an HTTP request
     */
    private sendRequest;
    /**
     * Send a request. If it fails, regenerate the token and try again.
     */
    private request;
    /**
     * Fetch a CSRF token
     */
    protected fetchToken(): Promise<string>;
    /**
     * Execute an action on uTorrent
     */
    execute(action: Action, params?: any): Promise<string>;
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
