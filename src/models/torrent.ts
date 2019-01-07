import { Model }    from "../core/model";
import { ITorrent } from "../types";

export enum RemoveFlag {
	JobOnly     = 0,
	WithTorrent = 1,
	WithData    = 2
}

export class Torrent extends Model
{
	/**
	 * Store all of the torrent information
	 */
	private __torrent!: ITorrent;

	/**
	 * Update the corrent information
	 */
	public setData (info: any) {
		this.__torrent  = {
			hash           : info[0],
			status         : info[1],
			name           : info[2],
			size           : info[3],
			progress       : info[4] / 1000,
			downloaded     : info[5],
			uploaded       : info[6],
			ratio          : info[7] / 1000,
			upload_speed   : info[8],
			download_speed : info[9],
			time_remaining : info[10],
			label          : info[11],
			peers_connected: info[12],
			peers_in_swarm : info[13],
			seeds_connected: info[14],
			seeds_in_swarm : info[15],
			availability   : info[16],
			queue_order    : info[18],
			download_url   : info[19],
			rss_feed_url   : info[20],
			status_message : info[21],
			stream_id      : info[22],
			date_added     : info[23],
			date_completed : info[24],
			app_update_url : info[25]
		};
	}

	/**
	 * Execute a generic action
	 */
	protected execute (action: string) {
		// Don't return the response of the execution.
		return new Promise((resolve, reject) => {
			this.utorrent().execute(action, {hash: this.__torrent.hash})
				.then(() => { resolve(); }).catch(reject);
		});
	}

	// Methods -------------------------------------------------------------------------------------

	/**
	 * Fetch the files associated with the torrent
	 */
	public files () {}

	/**
	 * Pause the torrent
	 */
	public pause () {
		return this.execute("pause");
	}

	/**
	 * Refresh the current torrent
	 */
	public refresh () {
		return new Promise((resolve, reject) => {
			this.utorrent().list().then(() => {
				resolve();
			}).catch(reject);
		});
	}

	/**
	 * Remove the torrent from uTorrent
	 */
	public remove (flags: RemoveFlag = RemoveFlag.JobOnly) {
		switch (flags) {
			case RemoveFlag.WithTorrent:
				return this.execute("removetorrent");
			case RemoveFlag.WithData:
				return this.execute("removedata");
			case RemoveFlag.WithTorrent | RemoveFlag.WithData:
				return this.execute("removetorrentdata");
			default:
				return this.execute("remove");
		}
	}

	/**
	 * Start the torrent
	 */
	public start (force: boolean = false) {
		return this.execute(`${force ? "force" : ""}"start"`);
	}

	/**
	 * Stop the torrent
	 */
	public stop () {
		return this.execute("stop");
	}

	/**
	 * Unpause the torrent
	 */
	public unpause () {
		return this.execute("unpause");
	}

	// Accessors -----------------------------------------------------------------------------------

	/**
	 * Get the app update URL (whatever that is...)
	 */
	appUpdateUrl () {
		return this.__torrent.app_update_url;
	}

	/**
	 * Get the availability of the torrent (whatever that is as well)
	 */
	availability () {
		return this.__torrent.availability;
	}

	/**
	 * Get the date the torrent was added
	 */
	dateAdded () {
		return this.__torrent.date_added;
	}

	/**
	 * Get the date the torrent was completed
	 */
	dateCompleted () {
		return this.__torrent.date_completed;
	}

	/**
	 * The amount of data downloaded (bytes)
	 */
	downloaded () {
		return this.__torrent.downloaded;
	}

	/**
	 * The download speed (bytes per second)
	 */
	downloadSpeed () {
		return this.__torrent.download_speed;
	}

	/**
	 * Get the download URL if it exists
	 */
	downloadUrl () {
		return this.__torrent.download_url || null;
	}

	/**
	 * Get the estimated time remaining (seconds)
	 */
	eta () {
		return this.__torrent.time_remaining;
	}

	/**
	 * The torrent's hash
	 */
	hash () {
		return this.__torrent.hash;
	}

	/**
	 * The torrent's label if set
	 */
	label () {
		return this.__torrent.label || null;
	}

	/**
	 * The name of the torrent
	 */
	name () {
		return this.__torrent.name;
	}

	/**
	 * The number of peers connected
	 */
	peersConnected () {
		return this.__torrent.peers_connected;
	}

	/**
	 * The peers in the swarm
	 */
	peersInSwarm () {
		return this.__torrent.peers_in_swarm;
	}

	/**
	 * The progress of the torrent
	 */
	progress () {
		return this.__torrent.progress;
	}

	/**
	 * The queue order of the torrent
	 */
	queueOrder () {
		return this.__torrent.queue_order;
	}

	/**
	 * The upload/download ratio of the torrent
	 */
	ratio () {
		return this.__torrent.ratio;
	}

	/**
	 * The RSS feed URL
	 */
	rssFeedUrl () {
		return this.__torrent.rss_feed_url;
	}

	/**
	 * The number of seeds connected
	 */
	seedsConnected () {
		return this.__torrent.seeds_connected;
	}

	/**
	 * The number of seeds in the swarm
	 */
	seedsInSwarm () {
		return this.__torrent.seeds_in_swarm;
	}

	/**
	 * The total size of the files
	 */
	size () {
		return this.__torrent.size;
	}

	/**
	 * The status of the torrent
	 */
	status () {
		return this.__torrent.status;
	}

	/**
	 * The status message of the torrent
	 */
	statusMessage () {
		return this.__torrent.status_message;
	}

	/**
	 * The stream ID of the torrent
	 */
	streamId () {
		return this.__torrent.stream_id;
	}

	/**
	 * The amount of data uploaded (bytes)
	 */
	uploaded () {
		return this.__torrent.uploaded;
	}

	/**
	 * The upload speed (bytes per second)
	 */
	uploadSpeed () {
		return this.__torrent.upload_speed;
	}
}
