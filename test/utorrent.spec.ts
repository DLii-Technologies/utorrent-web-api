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
 * Ubuntu 18.10 Server ISO
 */
const TORRENT_URL = "http://releases.ubuntu.com/18.10/ubuntu-18.10-live-server-amd64.iso.torrent";

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
	it("Fetched a token", () => {
		return utorrent.fetchToken();
	});

	it("Added torrent via URL", () => {
		return utorrent.addUrl(TORRENT_URL).then((hash) => {
			expect(hash.length).to.equal(40);
		});
	});

	it("List torrents", () => {
		return utorrent.list().then();
	});
});
