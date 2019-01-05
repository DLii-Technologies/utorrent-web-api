import { Status } from "./types";

// BaseUri = "http://[IP]:[PORT]/gui/";
// `http://[IP]:[PORT]/gui/?action=[ACTION]&hash=[TORRENT HASH 1]&hash=[TORRENT HASH 2]&...`

export class uTorrent
{
	private __host     : string = "";
	private __port     : number = 8080;
	private __username?: string = "";
	private __password?: string = "";

	/**
	 * Create a new instance of uTorrent
	 */
	constructor (host: string, port: number = 8080, username?: string, password?: string) {
		this.setAddress(host, port);
		this.setCredentials(username, password);
	}

	/**
	 * Set the connection address
	 */
	setAddress (host: string, port: number) {
		this.setHost(host);
		this.setPort(port);
		return this;
	}

	/**
	 * Set the login credentials
	 */
	setCredentials (username?: string, password?: string) {
		this.setUsername(username);
		this.setPassword(password);
		return this;
	}

	/**
	 * Set the connection host
	 */
	setHost (host: string) {
		this.__host = host;
		return this;
	}

	/**
	 * Set the login password
	 */
	setPassword (password?: string) {
		this.__password = password || "";
	}

	/**
	 * Set the connection port
	 */
	setPort (port: number) {
		this.__port = port;
		return this;
	}

	/**
	 * Set the login username
	 */
	setUsername (username?: string) {
		this.__username = username;
	}
}
