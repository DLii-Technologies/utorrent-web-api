import Request          from "request";
import { TokenError }   from "../errors";
import { NetworkUtils } from "../utils";
import { Action }       from "../types";
import request, {
	CoreOptions,
	UriOptions
} from "request";

/**
 * Manage the uTorrent server
 */
export class UtServer
{
	/**
	 * uTorrent information
	 */
	private __host    : string = "";
	private __port    : number = 8080;
	private __username: string = "";
	private __password: string = "";
	private __token  ?: string;

	/**
	 * The cookie jar
	 */
	private __cookieJar: request.CookieJar;

	/**
	 * Create a new instance of uTorrent
	 */
	constructor (host: string, port: number = 8080, username?: string, password?: string) {
		this.__cookieJar = Request.jar();
		this.setAddress(host, port);
		this.setCredentials(username, password);
	}

	/**
	 * Send an HTTP request
	 */
	private sendRequest(options: CoreOptions & UriOptions) {
		options.qs.token = this.__token;
		options.qsStringifyOptions = { arrayFormat: "repeat" };
		return new Promise<string>((resolve, reject) => {
			Request(options, (error, response, body) => {
				error = NetworkUtils.validateUtServerResponse(error, response, body);
				if (error) {
					reject(error);
				} else {
					resolve(body);
				}
			});
		});
	}

	/**
	 * Send a request. If it fails, regenerate the token and try again.
	 */
	private request (options: request.CoreOptions & request.UriOptions, retry = true) {
		// Add auth credentials and set the proper URI
		options.auth = {
			user           : this.__username,
			pass           : this.__password,
			sendImmediately: false
		};
		options.jar = this.__cookieJar;
		options.uri = `http://${this.__host}:${this.__port}/gui/${options.uri || ""}`;

		// Execute the request
		return new Promise<string>((resolve, reject) => {
			this.sendRequest(options).then(resolve).catch((error) => {
				// If a token error occurred, then a new token should be generated and try again
				if (error instanceof TokenError && retry) {
					this.fetchToken().then(() => {
						this.sendRequest(options).then(resolve).catch(reject);
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
			let options = NetworkUtils.defaultOptions({
				uri: "token.html"
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
	public execute (action: Action, params: any = {}) {
		let options: request.CoreOptions & request.UriOptions;
		if (action == Action.AddFile) {
			options = NetworkUtils.formOptions(params, {
				qs: { action: action }
			});
		} else {
			options = NetworkUtils.defaultOptions({
				qs: Object.assign(params, action == "list" ? { list: 1 } : { action: action })
			});
		}
		return this.request(options);
	}

	// Accessors/Mutators --------------------------------------------------------------------------

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
		this.__password = password || "";
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
		this.__username = username || "";
	}
}
