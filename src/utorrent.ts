import request        from "request";
import { Status }     from "./types";
import * as network   from "./network";
import { TokenError } from "./errors";

// BaseUri = "http://[IP]:[PORT]/gui/";
// `http://[IP]:[PORT]/gui/?action=[ACTION]&hash=[TORRENT HASH 1]&hash=[TORRENT HASH 2]&...`

export class uTorrent
{
	/**
	 * uTorrent information
	 */
	private __host  : string = "";
	private __port  : number = 8080;
	private __token?: string;

	/**
	 * The login credentials
	 */
	private __credentials: network.Credentials = {
		username: "",
		password: ""
	};

	/**
	 * The cookie jar
	 */
	private __cookieJar: request.CookieJar;

	/**
	 * Create a new instance of uTorrent
	 */
	constructor (host: string, port: number = 8080, username?: string, password?: string) {
		this.__cookieJar = request.jar();
		this.setAddress(host, port);
		this.setCredentials(username, password);
	}

	/**
	 * Generate a URL
	 */
	protected url (path: string = "") {
		return `http://${this.__host}:${this.__port}/gui/${path}`;
	}

	/**
	 * Fetch a CSRF token
	 */
	public fetchToken () {
		return new Promise<string>((resolve, reject) => {
			let options = network.defaultOptions({
				uri: this.url("token.html")
			});
			network.sendRequest(options, this.__cookieJar, this.__credentials).then((body) => {
				let token = (<string>body).replace(/<[^<]*>/g, "").trim();
				if (!token) {
					reject(new TokenError("Failed to retrieve token"));
				} else {
					this.__token = token;
					resolve(token);
				}
			}).catch(reject);
		});
	}

	/**
	 * Set the connection address
	 */
	public setAddress (host: string, port: number) {
		this.setHost(host);
		this.setPort(port);
		return this;
	}

	/**
	 * Set the login credentials
	 */
	public setCredentials(username?: string, password?: string) {
		this.setUsername(username);
		this.setPassword(password);
		return this;
	}

	/**
	 * Set the connection host
	 */
	public setHost (host: string) {
		this.__host = host;
		return this;
	}

	/**
	 * Set the login password
	 */
	public setPassword(password?: string) {
		this.__credentials.password = password || "";
	}

	/**
	 * Set the connection port
	 */
	public setPort (port: number) {
		this.__port = port;
		return this;
	}

	/**
	 * Set the login username
	 */
	public setUsername(username?: string) {
		this.__credentials.username = username || "";
	}
}
