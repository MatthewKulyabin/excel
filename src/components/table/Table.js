import { ExcelComponent } from '@core/ExcelComponent.js';
import { createTable } from '@/components/table/table.template.js';
import { $ } from '@core/dom.js';
import { resizeHandler } from '@/components/table/table.resizing.js';
import { shouldResize } from '@/components/table/table.functions.js';

export class Table extends ExcelComponent {
	static className = 'excel_table';

	constructor($root, options) {
		super($root, {
			listeners: ['mousedown']
		});
	}

	toHTML() {
		return createTable(1000);
	}

	onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}