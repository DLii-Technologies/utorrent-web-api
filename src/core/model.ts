import { uTorrent } from "utorrent";

export abstract class Model
{
	/**
	 * Store the uTorrent instance
	 */
	private __utorrent: uTorrent;

	/**
	 * Create the data manager
	 */
	constructor (utorrent: uTorrent) {
		this.__utorrent = utorrent;
	}

	/**
	 * Set the data
	 */
	public abstract setData (data: any): void;

	/**
	 * Get the uTorrent instance
	 */
	protected utorrent () {
		return this.__utorrent;
	}
}
