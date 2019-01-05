import { config } from "dotenv";
import { expect } from "chai";
import "mocha";

/**
 * Load hte environment file
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
	<string>process.env["host"],
	parseInt(<string>process.env["port"]),
	<string>process.env["username"],
	<string>process.env["password"]
);

/**
 * Test it out!
 */
describe("uTorrent", () => {

});
