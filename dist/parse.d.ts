import { IRssFilter, IRssFeed, IRssUpdate } from "./types";
/**
 * Parse an array of raw uTorrent RSS updates into the new format
 */
export declare function rssUpdates(updates: Array<any>): IRssUpdate[];
/**
 * Parse an array of raw uTorrent RSS feeds into the new format
 */
export declare function rssFeeds(feeds: Array<any>): IRssFeed[];
/**
 * Parse an array of raw uTorrent RSS feeds into the new format
 */
export declare function rssFilters(filters: Array<any>): IRssFilter[];
