import { RssFilter, RssFeed, RssUpdate, Torrent } from "./types";
/**
 * Parse an array of raw uTorrent RSS updates into the new format
 */
export declare function rssUpdates(updates: Array<any>): RssUpdate[];
/**
 * Parse an array of raw uTorrent RSS feeds into the new format
 */
export declare function rssFeeds(feeds: Array<any>): RssFeed[];
/**
 * Parse an array of raw uTorrent RSS feeds into the new format
 */
export declare function rssFilters(filters: Array<any>): RssFilter[];
/**
 * Parse an array of raw uTorrent torrents into the new format
 */
export declare function torrents(torrents: Array<any>): Torrent[];
