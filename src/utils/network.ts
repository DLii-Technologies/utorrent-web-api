import Request, { CoreOptions, UriOptions }     from "request";
import { AuthError,	TokenError,	uTorrentError } from "../errors";

/**
 * Generate a set of options to upload a file
 */
export function formOptions (params: any, options: CoreOptions | CoreOptions&UriOptions) {
	return Object.assign(defaultOptions({
		method: "POST",
		form: params,
		multipart: [<Request.RequestPart>{
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
export function defaultOptions (options: CoreOptions | CoreOptions&UriOptions) {
	return <CoreOptions & UriOptions>Object.assign({
		method: "GET",
		qs: {}
	}, options);
}

/**
 * Detect an error in the response
 */
export function validateUtServerResponse (error: any, response: Request.Response, body: any) {
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
