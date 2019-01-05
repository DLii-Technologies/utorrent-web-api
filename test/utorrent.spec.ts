import { config } from "dotenv";
import { expect } from "chai";
import "mocha";

/**
 * Load the environment file
 */
config();

/**
 * Import the items
 */
import * as Api from "../src";


/**
 * Create the uTorrent instance
 */
var utorrent = new Api.uTorrent(
	<string>process.env["HOST"],
	parseInt(<string>process.env["PORT"]),
	<string>process.env["AUTH_USER"],
	<string>process.env["AUTH_PASS"]
);

/**
 * Test it out!
 */
describe("uTorrent", () => {
	it("Fetch a token", () => {
		return utorrent.fetchToken();
	});
});
