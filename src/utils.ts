import parseTorrent from "parse-torrent";

/**
 * Fetch the torrent's hash
 */
export function torrentUrlHash (url: string) {
	return new Promise<string>((resolve, reject) => {
		try {
			resolve(parseTorrent(url).infoHash);
		} catch (e) {
			parseTorrent.remote(url, (err, info) => {
				if (err || !info) {
					reject(err);
				} else {
					resolve(info.infoHash);
				}
			});
		}
	});
}
