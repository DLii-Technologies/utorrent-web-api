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
import { TorrentStatus } from "../src";

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
 * Use to store a torrent
 */
let torrentHash: string;
let torrent    : Api.Torrent;

/**
 * Test it out!
 */
describe("uTorrent", () => {
	it("Fail first request, regenerate token, try again", () => {
		return utorrent.list();
	})

	it("Added torrent via URL, and fetch the hash", () => {
		return utorrent.addUrl(TORRENT_URL).then((hash) => {
			expect(hash.length).to.equal(40);
			torrentHash = hash;
		});
	});

	it("List torrents and find the added torrent", (done) => {
		setTimeout(() => {
			utorrent.list().then((result) => {
				torrent = result.torrents[torrentHash];
				expect(torrent).to.not.equal(undefined);
				done();
			}).catch(done);
		}, 1000);
	});

	it("Test model cache with updated results", () => {
		return utorrent.list().then((result) => {
			let newTorrent = result.torrents[torrent.hash];
			expect(newTorrent).to.equal(torrent);
		});
	});

	it("Torrent should not be paused", () => {
		expect(torrent.status & TorrentStatus.Paused).to.equal(0);
	});

	it("Pause the added torrent", () => {
		return torrent.pause();
	});

	it("Torrent should now be paused", () => {
		expect(torrent.status & TorrentStatus.Paused).to.equal(TorrentStatus.Paused);
	})

	it("Resume the added torrent", () => {
		return torrent.unpause();
	});
});
