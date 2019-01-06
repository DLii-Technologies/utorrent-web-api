"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const errors_1 = require("./errors");
/**
 * Detect an error in the response
 */
function detectError(error, response, body) {
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
/**
 * Generate a set of options for a form
 */
function formOptions(params, options) {
    return Object.assign(defaultOptions({
        method: "POST",
        uri: "",
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
 * Upload a file via HTTP
 */
function upload() {
}
exports.upload = upload;
/**
 * Send an HTTP request
 */
function sendRequest(options) {
    return new Promise((resolve, reject) => {
        request_1.default(options, (error, response, body) => {
            error = detectError(error, response, body);
            if (error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    });
}
exports.sendRequest = sendRequest;
//# sourceMappingURL=network.js.map