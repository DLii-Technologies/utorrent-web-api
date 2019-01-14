import { TorrentInput } from "types";
import { Torrent } from "models/torrent";

/**
 * Type mappings are currently broken... Use standard JavaScript for new.
 */
const parseTorrent = require("parse-torrent");

/**
 * Fetch the torrent's hash
 */
export function hashFromUrl(url: string) {
	return new Promise<string>((resolve, reject) => {
		try {
			resolve(parseTorrent(url).infoHash);
		} catch (e) {
			parseTorrent.remote(url, (err: any, info: any) => {
				if (err || !info) {
					reject(err);
				} else {
					resolve(info.infoHash.toUpperCase());
				}
			});
		}
	});
}
