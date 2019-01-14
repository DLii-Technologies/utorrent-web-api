import * as parse              from "./parse";
import { ModelCache }          from "./core/model_cache";
import { Torrent, RemoveFlag } from "./models/torrent";
import { TorrentUtils }        from "./utils";
import { UtServer }            from "./core/utserver";
import {
	ITorrentList,
	Action,
	TorrentInput,
	Priority,
	IFileList
} from "./types";
import { File } from "models/file";

export class uTorrent extends UtServer
{
	/**
	 * Create the torrent cache
	 */
	private __torrentCache = new ModelCache<Torrent>(Torrent, this);

	/**
	 * Parse the torrent input
	 */
	protected parseTorrentInput (torrents: TorrentInput) {
		let hashes: Array<string> = [];
		if (Array.isArray(torrents)) {
			for (let torrent of torrents) {
				if (typeof torrent == "string") {
					hashes.push(torrent);
				} else {
					hashes.push(torrent.hash);
				}
			}
		} else if (typeof torrents == "string") {
			hashes.push(torrents);
		} else if (torrents instanceof Torrent) {
			hashes.push(torrents.hash);
		} else {
			hashes = Object.keys(torrents.torrents);
		}
		return hashes;
	}

	/**
	 * Execute an action on a list of torrents and update them
	 */
	protected executeTorrentAction (torrents: TorrentInput, action: Action) {
		let hashes = this.parseTorrentInput(torrents);
		return new Promise<void>((resolve, reject) => {
			this.execute(action, { hash: hashes, list: 1}).then((body) => {
				let torrents = JSON.parse(body)["torrents"];
				this.__torrentCache.update(torrents);
				resolve();
			}).catch(reject);
		});
	}

	// Methods -------------------------------------------------------------------------------------

	/**
	 * Add a torrent via URL and get its hash
	 */
	public addUrl (url: string) {
		return new Promise<string>((resolve, reject) => {
			TorrentUtils.hashFromUrl(url).then((hash) => {
				this.execute(Action.AddUrl, { s: url }).then(() => {
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
			this.execute(Action.List).then((data: string) => {
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
	 * Get the files associated with a torrent
	 */
	public files (torrents: TorrentInput) {
		let hashes = this.parseTorrentInput(torrents);
		return new Promise<IFileList>((resolve, reject) => {
			this.execute(Action.GetFiles, { hash: hashes }).then((body) => {
				let result: IFileList = {};
				let fileInfo = JSON.parse(body)["files"];
				// 0 => hash, 1 => data, 2 => hash, 3 => data...
				for (let i = 0; i < fileInfo.length; i += 2) {
					let torrent = this.__torrentCache.fetch(fileInfo[i]);
					result[torrent.hash] = Object.values(torrent.__setFileData(fileInfo[i+1]));
				}
				resolve(result);
			}).catch(reject);
		});
	}

	/**
	 * Pause the torrent
	 */
	public pause (torrents: TorrentInput) {
		return this.executeTorrentAction(torrents, Action.Pause);
	}

	/**
	 * Refresh the torrent list
	 */
	public refresh () {
		return new Promise<void>((resolve, reject) => {
			this.list().then(() => {
				resolve();
			}).catch(reject);
		});
	}

	/**
	 * Remove the torrents from uTorrent.
	 *
	 * @param {Array<Torrent|string>} torrents Array of torrent objects/info hashes
	 */
	public remove (torrents: TorrentInput, flags: RemoveFlag = RemoveFlag.JobOnly) {
		switch (flags) {
			case RemoveFlag.WithTorrent:
				return this.executeTorrentAction(torrents, Action.RemoveTorrent);
			case RemoveFlag.WithData:
				return this.executeTorrentAction(torrents, Action.RemoveData);
			case RemoveFlag.WithTorrent | RemoveFlag.WithData:
				return this.executeTorrentAction(torrents, Action.RemoveTorrentData);
			default:
				return this.executeTorrentAction(torrents, Action.Remove);
		}
	}

	/**
	 * Start the torrent
	 */
	public start (torrents: TorrentInput, force: boolean = false) {
		if (force) {
			return this.executeTorrentAction(torrents, Action.ForceStart);
		}
		return this.executeTorrentAction(torrents, Action.Start);
	}

	/**
	 * Stop the torrent
	 */
	public stop (torrents: TorrentInput) {
		return this.executeTorrentAction(torrents, Action.Stop);
	}

	/**
	 * Unpause the torrent
	 */
	public unpause (torrents: TorrentInput) {
		return this.executeTorrentAction(torrents, Action.Unpause);
	}

	/**
	 * Get the version of uTorrent
	 */
	version () {}

	// Accessors/Mutators --------------------------------------------------------------------------
}
