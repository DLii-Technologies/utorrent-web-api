# utorrent-web-api

[![](https://img.shields.io/npm/v/utorrent-web-api.svg)](https://npmjs.org/package/utorrent-web-api)
[![](https://img.shields.io/npm/dm/utorrent-web-api.svg)](https://npmjs.org/package/utorrent-web-api)

A powerful and complete implementation of the uTorrent Web API. It is compatible with both Javascript and TypeScript!

**Note:** This library is a work in progress, so not all features may be available.

## Installation

```sh
npm i utorrent-web-api
```

## Examples

Some neat examples to show the simplicity and power of the API.

### Create a Client

Creating a new uTorrent client instance is easy!

```ts
import { uTorrent } from "utorrent-web-api";

// Create an instance of the client
let utorrent = new uTorrent(host, port, username, password);
```

### Add Torrents

Torrents can be added by .torrent URL, magnet link, or file upload.

```js
// Add a torrent via .torrent URL or magnet link
utorrent.addUrl(url).then((infoHash) => {
    console.log("Success! Info hash:", infoHash);
}).catch((err) => {
    console.error("Failed to add the torrent:", err);
});

// Add a torrent via .torrent file upload
[WORK IN PROGRESS]
```

### List Torrents

It's easy to get the list of torrents currently in uTorrent!

```js
let myAddedTorrent;

utorrent.list().then((result) => {
    // Find the added torrent and save it
    myAddedTorrent = result.torrents[infoHash];

    // Iterate over all torrents
    for (let hash in result.torrents) {
        // Do something with the torrent
    }
}).catch((err) => {
    console.error("Failed to list torrents", err);
});
```

### Working with Torrents

Once you have a torrent object, you can use that object to work with the torrent directly. Each time an action is performed, it will update all of its attributes with the latest information from the server. View the full Torrent documentation here: [Torrent Docs](https://doc.dlii.tech/utorrent-web-api/classes/torrent.html)

```js
// Check if the torrent status indicates it's paused
if (myAddedTorrent.status & TorrentStatus.Paused) {
    console.log("It is paused!");
}

// Refresh the torrent
myAddedTorrent.refresh().then(() => {
    console.log("Torrent refreshed successfully");
});

// Pause the torrent
myAddedTorrent.pause().then(() => {
    console.log("Paused successfully");
});

// Start the torrent
myAddedTorrent.start().then(() => {
    console.log("Started successfully");
});

// Delete the torrent with its data
myAddedTorrent.remove(RemoveFlag.WithTorrent | RemoveFlag.WithData).then(() => {
    console.log("Removed successfully");
});
```

### Downloaded Files

It's a peace of cake to manage downloading or downloaded files with the API! You can check on their progress and manage their priority.

```ts
// Fetch the files
myTorrent.files().then((fileArray) => {
    for (let file of fileArray) {
        console.log("Name:", file.name, "; Progress:", file.progress * 100);
    }
});

// Set a file's download priority
file.setPriority(Priority.Skip).then(() => {
    console.log("This file will not be downloaded...");
});

// Set the priority of multiple files at once
myTorrent.setFilePriority(myTorrentFiles, Priority.High).then(() => {
    console.log("The files specified have been set");
});
```

## Documentation

[Full Documention](https://doc.dlii.tech/utorrent-web-api) can be found here
