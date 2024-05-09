export class LocalStorage<T> {
	key: string
	defaultValue: T

	constructor(key: string, defaultValue: T) {
		this.key = key
		this.defaultValue = defaultValue
	}

	get() {
		if (typeof window === "undefined") {
			return this.defaultValue
		}
		const storage = localStorage.getItem(this.key)
		if (!storage) {
			localStorage.setItem(this.key, JSON.stringify(this.defaultValue))
			return this.defaultValue
		}
		return JSON.parse(storage) as T
	}
	set(value: T) {
		localStorage.setItem(this.key, JSON.stringify(value))
	}
}
