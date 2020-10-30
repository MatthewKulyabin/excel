import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom.js';

export class Formula extends ExcelComponent {
	static className = 'excel_formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options,
		});
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`;
	}

	init() {
		super.init();

		this.$formula = this.$root.find('#formula');

		this.$on('table:select', $cell => {
			this.$formula.text($cell.text());
		});

		this.$on('table:input', $cell => {
			this.$formula.text($cell.text());
		});
	}

	onInput() {
		this.$emit('formula:input', $(event.target).text());
	}

	onKeydown() {
		const keys = [
      'Enter',
      'Tab',
    ];

    const { key } = event;

		if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
	}
}