import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
	static className = 'excel_formula';

	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click']
		});
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`;
	}

	onInput() {
		console.log('Formula: onInput', event);
	}

	onClick() {
		console.log('Formula: click', event);
	}
}