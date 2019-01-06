import { Torrent } from "./types";

/**
 * Parse an array of raw uTorrent torrents into the new format
 */
export function torrents (torrents: Array<any>) {
	let result: Array<Torrent> = [];
	for (let torrent of torrents) {
		result.push({
			hash           : torrent[0],
			status         : torrent[1],
			name           : torrent[2],
			size           : torrent[3],
			progress       : torrent[4] / 1000,
			downloaded     : torrent[5],
			uploaded       : torrent[6],
			up_down_ratio  : torrent[7],
			upload_speed   : torrent[8],
			download_speed : torrent[9],
			time_remaining : torrent[10],
			label          : torrent[11],
			peers_connected: torrent[12],
			peers_in_swarm : torrent[13],
			seeds_connected: torrent[14],
			seeds_in_swarm : torrent[15],
			availability   : torrent[16],
			queue_order    : torrent[18],
			download_url   : torrent[19],
			rss_feed_url   : torrent[20],
			status_message : torrent[21],
			stream_id      : torrent[22],
			date_added     : new Date(torrent[23] * 1000),
			date_completed : torrent[24] ? new Date(torrent[24] * 1000) : null,
			app_update_url : torrent[25]
		});
	}
	return result;
}
