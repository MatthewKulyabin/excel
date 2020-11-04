import {storage} from '@core/utils';

function toHTML(keys) {
	return function(el, index) {
		const model = storage(keys[index]);
		return `
			<li class="db__record">
				<a href="#${keys[index]}">${model['title']}</a>
				<strong>${model['openDate']}</strong>
			</li>
		`;
	}
}

function getAllKeys() {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.includes('excel')) {
			continue;
		}
		keys.push(key);
	}
	return keys;
}

export function createRecordsTable() {
	const keys = getAllKeys();

	if (!keys.length) {
		return `<p>You didn't create any tables yet</p>`;
	}

	return `
		<div class="db__list-header">
	    <span>Название</span>
	    <span>Дата открытия</span>
	  </div>

	  <ul class="db__list">
	  	${keys.map(toHTML(keys)).join('')}
	  </ul>
	`;
}