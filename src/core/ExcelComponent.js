import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubscribers = [];

		this.prepare();
	}

	// Set up our component to init
	prepare() {
		
	}

	// Return component pattern
	toHTML() {
		return '';
	}

	// Inform listeners about events
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	// Subscribe on event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	// Component initializing
	// Add DOM listeners
	init() {
		this.initDOMListeners();
	}

	// Delete component
	// Remove listeners
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsub => unsub());
	}
}