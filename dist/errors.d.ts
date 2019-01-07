/**
 * A general uTorrent error
 */
export declare class uTorrentError extends Error {
    constructor(message?: string);
}
/**
 * An authorization error
 */
export declare class AuthError extends Error {
    constructor(message?: string);
}
/**
 * A token error
 */
export declare class TokenError extends Error {
    constructor(message?: string);
}
