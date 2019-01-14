import { Model } from "../models/model";

/**
 * A cache used to add new, update existing, and remove unused object instances.
 */
export class ModelCache<T extends Model>
{
	/**
	 * The arguments to send to the models
	 */
	private __args: any;

	/**
	 * Store the model type
	 */
	private __model: any;

	/**
	 * The set that contains the cached items
	 */
	private __set: {
		[id: string]: T
	};

	/**
	 * Create the model cache
	 */
	constructor(model: { new(...args: any[]): T }, ...args: any[]) {
		this.__model = model;
		this.__args  = args;
		this.__set   = {};
	}

	/**
	 * Create a new model instance
	 */
	protected create (model: { new(...args: any[]): T }, args: any[]) {
		return new model(...this.__args);
	}

	/**
	 * Fetch all elements in the cache
	 */
	all () {
		return Object.assign({}, this.__set);
	}

	/**
	 * Fetch an existing object and update it.
	 * If it doesn't exist, create it
	 * (Assumes first item in data is ID)
	 */
	fetch (id: number|string) {
		let item = this.__set[id];
		if (item === undefined) {
			item = this.create(this.__model, this.__args);
			this.__set[id] = item;
		}
		return item;
	}

	/**
	 * Update the cache
	 */
	public update (data: any[]) {
		let ids = Object.assign({}, this.__set);
		for (let modelData of data) {
			let item = this.fetch(modelData[0]);
			item.__setData(modelData);
			delete ids[modelData[0]];
		}
		for (let id in ids) {
			delete this.__set[id];
		}
		return this;
	}
}
