import {
	IRssFilter,
	IRssFeed,
	IRssUpdate
} from "./types";

/**
 * Parse an array of raw uTorrent RSS updates into the new format
 */
export function rssUpdates (updates: Array<any>) {
	let result: Array<IRssUpdate> = [];
	for (let update of updates) {
		result.push({
			name      : update[0],
			name_full : update[1],
			url       : update[2],
			quality   : update[3],
			codec     : update[4],
			timestamp : update[5],
			season    : update[6],
			episode   : update[7],
			episode_to: update[8],
			feed_id   : update[9],
			repack    : update[10],
			in_history: update[11]
		});
	}
	return result;
}

/**
 * Parse an array of raw uTorrent RSS feeds into the new format
 */
export function rssFeeds (feeds: Array<any>) {
	let result: Array<IRssFeed> = [];
	for (let feed of feeds) {
		result.push({
			id            : feeds[0],
			enabled       : feeds[1],
			use_feed_title: feeds[2],
			user_selected : feeds[3],
			programmed    : feeds[4],
			download_state: feeds[5],
			url           : feeds[6],
			next_update   : feeds[7],
			history       : rssUpdates(feeds[8])
		});
	}
	return result;
}

/**
 * Parse an array of raw uTorrent RSS feeds into the new format
 */
export function rssFilters (filters: Array<any>) {
	let result: Array<IRssFilter> = [];
	for (let filter of filters) {
		result.push({
			id                 : filters[0],
			flags              : filters[1],
			name               : filters[2],
			filter             : filters[3],
			not_filter         : filters[4],
			directory          : filters[5],
			feed               : filters[6],
			quality            : filters[7],
			label              : filters[8],
			postpone_mode      : filters[9],
			last_match         : filters[10],
			smart_ep_filter    : filters[11],
			repack_ep_filter   : filters[12],
			episode_filter_str : filters[13],
			episode_filter     : filters[14],
			resolving_candidate: filters[15]
		});
	}
	return result;
}

// /**
//  * Parse an array of raw uTorrent torrents into the new format
//  */
// export function torrents (torrents: Array<any>) {
// 	let result: Array<ITorrent> = [];
// 	for (let torrent of torrents) {
// 		result.push({
// 			hash           : torrent[0],
// 			status         : torrent[1],
// 			name           : torrent[2],
// 			size           : torrent[3],
// 			progress       : torrent[4] / 1000,
// 			downloaded     : torrent[5],
// 			uploaded       : torrent[6],
// 			up_down_ratio  : torrent[7] / 1000,
// 			upload_speed   : torrent[8],
// 			download_speed : torrent[9],
// 			time_remaining : torrent[10],
// 			label          : torrent[11],
// 			peers_connected: torrent[12],
// 			peers_in_swarm : torrent[13],
// 			seeds_connected: torrent[14],
// 			seeds_in_swarm : torrent[15],
// 			availability   : torrent[16],
// 			queue_order    : torrent[18],
// 			download_url   : torrent[19],
// 			rss_feed_url   : torrent[20],
// 			status_message : torrent[21],
// 			stream_id      : torrent[22],
// 			date_added     : new Date(torrent[23] * 1000),
// 			date_completed : torrent[24] ? new Date(torrent[24] * 1000) : null,
// 			app_update_url : torrent[25]
// 		});
// 	}
// 	return result;
// }
