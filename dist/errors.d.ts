/**
 * A general uTorrent error
 */
export declare class uTorrentError extends Error {
    constructor(message?: string);
}
/**
 * An authorization error
 */
export declare class AuthError extends uTorrentError {
    constructor(message?: string);
}
/**
 * A token error
 */
export declare class TokenError extends uTorrentError {
    constructor(message?: string);
}
