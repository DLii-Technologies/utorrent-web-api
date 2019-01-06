# utorrent-web-api

A powerful and complete implementation of the uTorrent Web API. It is compitable with both Javascript and Typescript!

## Example

```js
import { uTorrent } from "utorrent-web-api";

// Create an instance of the client
var utorrent = new uTorrent(host, port, username, password);

// Add a torrent via URL
utorrent.addUrl(magnetOrUrl).then((hash) => {
    console.log("The torrent's hash is:", hash);
});

// List all torrents
utorrent.list().then((result) => {
    console.log("Number of torrents:", result.torrents.length);
});
```

## Installation

```sh
npm i utorrent-web-api
```

## Documentation

[Full Documention](https://doc.dlii.tech/utorrent-web-api) can be found here
