"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
/**
 * Generate a set of options to upload a file
 */
function formOptions(params, options) {
    return Object.assign(defaultOptions({
        method: "POST",
        form: params,
        multipart: [{
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
exports.formOptions = formOptions;
/**
 * Generate the default options
 */
function defaultOptions(options) {
    return Object.assign({
        method: "GET",
        qs: {}
    }, options);
}
exports.defaultOptions = defaultOptions;
/**
 * Detect an error in the response
 */
function validateUtServerResponse(error, response, body) {
    if (error) {
        if (error.code == "ECONNREFUSED") {
            return new errors_1.uTorrentError("Connection Refused");
        }
        return error;
    }
    else if (typeof body == "object" && "error" in body) {
        return new errors_1.uTorrentError(body.error);
    }
    else if (response.statusCode != 200) {
        switch (response.statusCode) {
            case 400:
                return new errors_1.TokenError("Bad token");
            case 401:
                return new errors_1.AuthError("Bad username or password");
        }
        return new Error("Error status code: response.statusCode");
    }
}
exports.validateUtServerResponse = validateUtServerResponse;
//# sourceMappingURL=network.js.map