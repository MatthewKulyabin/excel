export class Store {
	static state;
	static listeners = [];

	constructor(rootReducer, initialState) {
		this.rootReducer = rootReducer
		Store.state = this.rootReducer({...initialState}, {type: '__INIT__'});
	}

	subscribe(fn) {
		Store.listeners.push(fn);
		return {
			unsubscribe() {
				listeners = listeners.filter(l => l !== fn);
			},
		}
	}

	dispatch(action) {
		Store.state = this.rootReducer(Store.state, action);
		Store.listeners.forEach(l => l(Store.state));
	}

	getState() {
		return JSON.parse(JSON.stringify(Store.state));
	}
}
