export declare class uTorrent {
    private __host;
    private __port;
    private __username?;
    private __password?;
    /**
     * Create a new instance of uTorrent
     */
    constructor(host: string, port?: number, username?: string, password?: string);
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
