import request, { CoreOptions, UriOptions }     from "request";
import { AuthError, TokenError, uTorrentError } from "./errors";

export interface Credentials {
	username: string,
	password: string,
}

/**
 * Detect an error in the response
 */
function detectError(error: any, response: request.Response, body: any) {
	if (error) {
		if (error.code == "ECONNREFUSED") {
			return new uTorrentError("Connection Refused");
		}
		return error;
	} else if (typeof body == "object" && "error" in body) {
		return new uTorrentError(body.error);
	} else if (response.statusCode != 200) {
		switch (response.statusCode) {
			case 400:
				return new TokenError("Bad token");
			case 401:
				return new AuthError("Bad username or password");
		}
		return new Error("Error status code: response.statusCode");
	}
}

/**
 * Generate a set of options for a form
 */
export function formOptions () {

}

/**
 * Generate the default options
 */
export function defaultOptions (options?: CoreOptions & UriOptions) {
	return <CoreOptions & UriOptions>Object.assign({
		method: "GET",
	}, options);
}

/**
 * Send an HTTP request
 */
export function sendRequest(options: CoreOptions & UriOptions,
	cookieJar: request.CookieJar, credentials?: Credentials)
{
	if (cookieJar) {
		options.jar = cookieJar;
	}
	if (credentials) {
		options.auth = {
			user: credentials.username,
			pass: credentials.password,
			sendImmediately: false
		}
	}

	return new Promise<string>((resolve, reject) => {
		request(options, (error, response, body) => {
			error = detectError(error, response, body);
			if (error) {
				reject(error);
			} else {
				resolve(body);
			}
		});
	});
}
