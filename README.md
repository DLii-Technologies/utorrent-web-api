# utorrent-web-api

A powerful, complete implementation of the uTorrent Web API.

## Example

```js
import { uTorrent } from "utorrent-web-api";

// Create an instance of the client
var utorrent = new uTorrent(host, port, username, password);

// Add a torrent via URL
utorrent.addUrl(magnetOrUrl).then((hash) => {
    // The added torrent's hash is returned for later lookup
});

// List all torrents
utorrent.list().then((result) => {
    console.log("Number of torrents:", result.torrents.length);
});
```

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)

**API:**
- [addUrl](#addurlurl)
- [list](#list)

**Enums:**
- [Access](#access)
- [Priority](#priority)
- [Status](#status)

**Types/Interfaces:**
- [Torrent](#torrent)

# Installation

```sh
npm i utorrent-web-api
```

# Usage

```ts
// JavaScript
const uTorrentApi = require("utorrent-web-api");

// TypeScript
import * as uTorrentApi from "utorrent-web-api";
```

# API

- [addUrl](#addurlurl)
- [list](#list)

## addUrl(url)

Adds a torrent by the given URL. The URL can be either a direct link to a torrent file, or a magnet link.

**Arguments:**
`url` - Magnet link or URL of torrent file

**Returns**:
`Promise\<Hash\>`

**Example**
```ts
client.addUrl(magnetLinkOrUrl).then((hash) => {
	console.log("The hash of the added torrent is:", hash);
}).catch((err) => {
	console.error("Something went wrong:", err);
})
```

## list()

List all torrents currently in uTorrent.

**Returns:**
`Promise<TorrentList>`

## Enums

These enums are an easier way to use and represent the possible values something in the API may have.

- [Access](#access)
- [Priority](#priority)
- [Status](#status)

## Access

Used to specify if the client can view and/or modify a setting

`ReadOnly` - Allow read only
`WriteOnly` - Allow write only
`ReadWrite` - Allow borth read and write

## Priority

Indicates the priority of a downloading torrent's files

`Skip` - Don't download the file
`Low` - Download with low priority
`Normal` - Download with normal priority
`High` - Download with high priority

## Status

The status of a torrent is a bitfield. These flags can be combined together into a single result

`Started` - The torrent has started downloading
`Checking` - The torrent is checking it's files
`StartAfterChecking` - The torrent will start after checking
`Checked` - The torrent has checked its files
`Error` - The torrent is in an error state
`Paused` - The torrent is paused
`Queued` - The torrent is currently queued
`Loaded` - The torrent is loaded

**Example:**

```ts
if (torrent.status & Status.Started) {
    // The status contains the `Started` flag
}
```

## Types

These are the object types used throughout the API

- [Torrent](#torrent)

## Torrent

Parameter        | Type       | Description
---------------- | ---------- | -----------
`hash`           | string     | Torrent's hash
`status`         | Status     | Status of the torrent
`name`           | string     | Name of the torrent
`size`           | integer    | Size of the torrent in bytes
`progress`       | float      | Progress of the torrent between 0.0 and 1.0
`downloaded`     | integer    | Number of bytes downloaded so far
`uploaded`       | integer    | Number of bytes uploaded so far
`up_down_ratio`  | float      | Download/Upload ration
`upload_speed`   | integer    | Upload speed in bytes per second
`download_speed` | integer    | Download speed in bytes per second
`time_remaining` | integer    | Estimated remaining time in seconds
`label`          | string     | This torrent's label
`peers_connected`| integer    | Number of connected peers
`peers_in_swarm` | integer    | Total number of peers in the swarm
`seeds_connected`| integer    | Number of connected seeders
`seeds_in_swarm` | integer    | Total number of seeders in the swarm
`availability`   | integer    | No idea what this is... but it's here.
`queue_order`    | integer    | This torrent's order in the queue
`download_url`   | string     | The download URL for the torrent
`rss_feed_url`   | string     | RSS feed URL
`status_message` | string     | Status message of the torrent
`stream_id`      | string     | Not sure what this is either...
`date_added`     | Date       | The time and date the torrent was added
`date_completed` | Date\|null | The time and date that the torrent completed
`app_update_url` | string     | Something you'll never use
