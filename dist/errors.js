"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A general uTorrent error
 */
class uTorrentError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.uTorrentError = uTorrentError;
/**
 * An authorization error
 */
class AuthError extends uTorrentError {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AuthError = AuthError;
/**
 * A token error
 */
class TokenError extends uTorrentError {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.TokenError = TokenError;
//# sourceMappingURL=errors.js.map