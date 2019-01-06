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
export function formOptions (params: any, options: CoreOptions & UriOptions) {
	return Object.assign(defaultOptions({
		method   : "POST",
		uri      : "",
		form     : params,
		multipart: [<request.RequestPart>{
				"Content-Disposition": 'form-data; name="torrent_file"; filename="torrent_file.torrent"',
				"Content-Type": "application/x-bittorent",
				body: params["torrent_file"]
			},
			{ body: params["torrent_file"] }
		],
		headers: {
			"Content-Type": "multipart/form-data"
		}
	}), options);
}

/**
 * Generate the default options
 */
export function defaultOptions (options: CoreOptions & UriOptions) {
	return <CoreOptions & UriOptions>Object.assign({
		method: "GET",
		qs: {}
	}, options);
}

/**
 * Upload a file via HTTP
 */
export function upload () {

}

/**
 * Send an HTTP request
 */
export function sendRequest (options: CoreOptions & UriOptions) {
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
