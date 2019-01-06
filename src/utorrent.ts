import request            from "request";
import { TokenError }     from "./errors";
import { torrentUrlHash } from "./utils";
import * as network       from "./network";
import * as parse         from  "./parse";
import {
	Torrent,
	TorrentList,
	TorrentListCache,
	RssFeed,
	RssFilter,
	RssUpdate
} from "./types";

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
	 * Send a request. If it fails, regenerate the token and try again.
	 */
	protected request (options: request.CoreOptions & request.UriOptions, retry = true) {
		// Add auth and cookies to request
		options.auth = {
			user           : this.__credentials.username,
			pass           : this.__credentials.password,
			sendImmediately: false
		};
		options.jar = this.__cookieJar;

		// Execute the request
		return new Promise<string>((resolve, reject) => {
			network.sendRequest(options).then(resolve)
			.catch((error) => {
				if (error instanceof TokenError && retry) {
					this.fetchToken().then((token) => {
						options.qs.token = this.__token;
						this.request(options, false).then(resolve).catch(reject);
					}).catch(reject);
				} else {
					reject(error);
				}
			});
		});
	}

	/**
	 * Fetch a CSRF token
	 */
	protected fetchToken () {
		return new Promise<string>((resolve, reject) => {
			let options = network.defaultOptions({
				uri: this.url("token.html")
			});
			this.request(options, false).then((body) => {
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
	 * Execute an action on uTorrent
	 */
	protected execute (action: string, params: any = {}) {
		let options: request.CoreOptions & request.UriOptions;
		if (action == "add-file") {
			options = network.formOptions(params, {
				uri: this.url(),
				qs: { action: action }
			});
		} else {
			options = network.defaultOptions({
				uri: this.url(),
				qs: Object.assign(params, action == "list" ? { list: 1 } : { action: action })
			});
		}
		options.qs.token = this.__token;
		return this.request(options);
	}

	// Methods -------------------------------------------------------------------------------------

	/**
	 * Add a torrent via URL
	 */
	public addUrl (url: string) {
		return new Promise<string>((resolve, reject) => {
			torrentUrlHash(url).then((hash) => {
				this.execute("add-url", { s: url }).then(() => {
					resolve(hash);
				}).catch(reject);
			}).catch(reject);
		});
	}

	/**
	 * List the torrents currently in uTorrent
	 */
	public list () {
		return new Promise<TorrentList>((resolve, reject) => {
			this.execute("list").then((data: string) => {
				let list: any = JSON.parse(data);
				let result: TorrentList = {
					build      : list["build"],
					cache_id   : list["torrentc"],
					labels     : {},
					torrents   : parse.torrents(list["torrents"]),
					rss_feeds  : parse.rssFeeds(list["rssfeeds"]),
					rss_filters: parse.rssFilters(list["rssfilters"]),
				}
				resolve(result);
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
