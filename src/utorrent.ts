import * as parse       from "./parse";
import { ModelCache }   from "./core/model_cache";
import { Torrent }      from "./models/torrent";
import { TorrentUtils } from "./utils";
import { UtServer }     from "./core/utserver";
import {
	ITorrentList,
	ITorrentListCache,
	IRssFeed,
	IRssFilter,
	IRssUpdate
} from "./types";

export class uTorrent extends UtServer
{
	/**
	 * Create the torrent cache
	 */
	private __torrentCache = new ModelCache<Torrent>(Torrent, this);

	// Methods -------------------------------------------------------------------------------------

	/**
	 * Add a torrent via URL and get its hash
	 */
	public addUrl (url: string) {
		return new Promise<string>((resolve, reject) => {
			TorrentUtils.hashFromUrl(url).then((hash) => {
				this.execute("add-url", { s: url }).then(() => {
					resolve(hash);
				}).catch(reject);
			}).catch(reject);
		});
	}

	/**
	 * List the torrents currently in uTorrent
	 */
	public list () {
		return new Promise<ITorrentList>((resolve, reject) => {
			this.execute("list").then((data: string) => {
				let list: any = JSON.parse(data);
				resolve({
					cache_id   : list["torrentc"],
					labels     : {},
					torrents   : this.__torrentCache.update(list["torrents"]).all(),
					rss_feeds  : parse.rssFeeds(list["rssfeeds"]),
					rss_filters: parse.rssFilters(list["rssfilters"]),
				});
			}).catch(reject);
		});
	}

	/**
	 * Get the version of uTorrent
	 */
	version () {}

	// Accessors/Mutators --------------------------------------------------------------------------
}
