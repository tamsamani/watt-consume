import UID from "./UID"

/**
 * @description Elementary data store for manipulate data with main storage
 */
class StoreObject {
	/**
	 * @param {String} key keyname for save store model in Parent
	 * @param {any} model any non-circular object to store it
	 * @param {MainStorage} parent A main storage where located all related data; default is null
	 */
	constructor(key, model, parent = null) {
		this.parent = () => parent;
		this.key = key;
		this.model = model;
		this.version = parent ? parent.version : -1;
		this.created = Date.now();
		this.updated = -1;
	}

	upgrade(newModel) { return this.parent().upgrade(this.key, newModel); }
	delete() { this.parent().delete(this.key); }
	save() { return this.parent().save(this.key); }

	static create(obj, parent) {
		let store = new StoreObject(obj.key, obj.model, parent);
		store.version = obj.version;
		store.created = obj.created;
		store.updated = obj.updated;
		return store;
	}
}


export default class MainStorage {
	constructor(name, version, storage) {
		this.name = name;
		this.version = version;
		this.localStorage = storage || window.localStorage;

		this.uKey = this.localStorage.getItem(name);
		this.store = {};
		if (!this.uKey) {
			this.uKey = UID(16);
			this.savedStores = new Set();
			this.save();
		}
		else {
			this.savedStores = new Set(this.localStorage.getItem(this.uKey).match(/\w+/g));
			this.savedStores.forEach(
				key => this.store[key] = StoreObject.create(JSON.parse(this.localStorage.getItem(key + this.uKey)), this)
			);
		}


	}

	storeObject(key, model) {
		return new StoreObject(key, model, this);
	}

	create(key, model) {
		if (key in this.store) return false;
		this.store[key] = this.storeObject(key, model);
		return this.store[key];
		// return this.store[key];
	}

	// this function create and update automatically
	createIfNot(key, defaultModel) {
		if (key in this.store) {
			if (defaultModel) {
				return this.upgrade(key, defaultModel);
			}
		}
		else return this.create(key, defaultModel).save();
	}

	upgrade(key, newModel) {
		if (key in this.store) {
			let { created } = this.store[key];
			this.store[key] = Object.assign(this.store[key], this.storeObject(key, newModel), { created });
			return this.store[key];
		}
		return false;
	}

	delete(key) {
		if (key in this.store) {
			this.localStorage.removeItem(key + this.uKey);
			this.store[key] = null;
			this.delete(key);
			delete this.store[key];
			return true;
		}
		return false;
	}

	get(key) {
		if (key in this.store) {
			return this.store[key];
		}
		return false;
	}

	save(key) {
		if (!key) {
			this.localStorage.setItem(this.name, this.uKey);
			this.localStorage.setItem(this.uKey, Array.from(this.savedStores));
			for (let k in this.store) {
				this.localStorage.setItem(k + this.uKey, JSON.stringify(this.store[k]))
			}
			return this;
		}
		else if (key in this.store) {
			this.savedStores.add(key);
			this.localStorage.setItem(this.uKey, Array.from(this.savedStores));
			this.localStorage.setItem(key + this.uKey, JSON.stringify(this.store[key]));
			return this.store[key];
		}
		else return false;
	}
}
