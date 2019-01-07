# utorrent-web-api

A powerful and complete implementation of the uTorrent Web API. It is compitable with both Javascript and Typescript!

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
utorrent.addUrl().then((infoHash) => {
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
    for (let torrent of result.torrents) {
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


## Documentation

[Full Documention](https://doc.dlii.tech/utorrent-web-api) can be found here
