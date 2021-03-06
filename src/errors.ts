/**
 * A general uTorrent error
 */
export class uTorrentError extends Error {
	constructor (message ?: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

/**
 * An authorization error
 */
export class AuthError extends Error {
	constructor (message ?: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

/**
 * A token error
 */
export class TokenError extends Error {
	constructor (message ?: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
