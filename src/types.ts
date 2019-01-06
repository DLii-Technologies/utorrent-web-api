
/**
 * The possible access settings
 */
export enum Access {
	ReadOnly  = "R",
	WriteOnly = "W",
	ReadWrite = "Y"
}

/**
 * The possible torrent priorities
 */
export enum Priority {
	Skip   = 0,
	Low    = 1,
	Normal = 2,
	High   = 3
}

/**
 * The possible status bit-flags
 */
export enum Status {
	Started            = 1,
	Checking           = 2,
	StartAfterChecking = 4,
	Checked            = 8,
	Error              = 16,
	Paused             = 32,
	Queued             = 64,
	Loaded             = 128
}

// http://[IP]:[PORT]/gui/?list=1 ------------------------------------------------------------------

/**
 * A container for a listed torrent
 */
export interface Torrent {
	hash           : string,
	status         : Status,
	name           : string,
	size           : number,
	progress       : number,
	downloaded     : number,
	uploaded       : number,
	up_down_ratio  : number,
	upload_speed   : number,
	download_speed : number,
	time_remaining : number,
	label          : string,
	peers_connected: number,
	peers_in_swarm : number,
	seeds_connected: number,
	seeds_in_swarm : number,
	availability   : number,
	queue_order    : number,
	download_url   : string,
	rss_feed_url   : string,
	status_message : string,
	stream_id      : string,
	date_added     : Date,
	date_completed : Date|null,
	app_update_url : string
}

/**
 * Represents an RSS feed update
 */
export interface RssUpdate {
	name      : string,
	name_full : string,
	url       : string,
	quality   : number,
	codec     : number,
	timestamp : number,
	season    : number,
	episode   : number,
	episode_to: number,
	feed_id   : number,
	repack    : boolean,
	in_history: boolean
}

/**
 * Represents the RSS feed
 */
export interface RssFeed {
	id            : number,
	enabled       : boolean,
	use_feed_title: boolean,
	user_selected : boolean,
	programmed    : boolean,
	download_state: number,
	url           : string,
	next_update   : number,
	history       : Array<RssUpdate>
}

/**
 * Represents an RSS filter
 */
export interface RssFilter {
	id                 : number,
	flags              : number,
	name               : string,
	filter             : string,
	not_filter         : string,
	directory          : string,
	feed               : number,
	quality            : number,
	label              : string,
	postpone_mode      : number,
	last_match         : number,
	smart_ep_filter    : number,
	repack_ep_filter   : number,
	episode_filter_str : string,
	episode_filter     : boolean,
	resolving_candidate: boolean
}

/**
 * Represents the torrent list returned by uTorrent
 */
export interface TorrentList {
	build     : number,
	torrents  : Array<Torrent>
	rss_feeds  : Array<RssFeed>,
	rss_filters: Array<RssFilter>,
	cache_id  : string|number,
	labels    : {
		[key: string]: number
	}
}

// http://[IP]:[PORT]/gui/?list=1&cid=[CACHE ID] ---------------------------------------------------

/**
 * Represents the torrent list returned by uTorrent when using a cache ID
 */
export interface TorrentListCache {
	build   : number,
	cache_id: string|number
	torrents: {
		changed: Array<Torrent>,
		removed: Array<string>
	},
	rss_feeds: {
		changed: Array<RssFeed>,
		removed: Array<number>
	},
	rss_filters: {
		change: Array<RssFilter>,
		removed: Array<number>
	}
}

// http://[IP]:[PORT]/gui/?action=getfiles&hash=[TORRENT HASH] -------------------------------------

/**
 * Represents a single file's information from a torrent
 */
export interface FileInfo {
	name         : string,
	size         : number,
	downloaded   : number,
	priority     : number,
	first_piece  : number,
	num_pieces   : number,
	streamable   : boolean,
	encoded_rate : number,
	duration     : number,
	width        : number,
	height       : number,
	stream_eta   : number,
	streamability: number
}

/**
 * Represents a file list for a torrent returned by uTorrent
 */
export interface FileList {
	build: number,
	hash : string,
	files: Array<FileInfo>
}

