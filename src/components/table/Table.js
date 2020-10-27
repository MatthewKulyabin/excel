import { ExcelComponent } from '@core/ExcelComponent.js';
import { createTable } from '@/components/table/table.template.js';
import { $ } from '@core/dom.js';
import { resizeHandler } from '@/components/table/table.resizing.js';
import { shouldResize } from '@/components/table/table.functions.js';
import { TableSelection } from '@/components/table/table.selection.js';

export class Table extends ExcelComponent {
	static className = 'excel_table';

	constructor($root, options) {
		super($root, {
			listeners: ['mousedown', 'click']
		});
	}

	toHTML() {
		return createTable(20);
	}

	init() {
		super.init();
	}

	onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onClick(event) {
  	document.onkeydown = () => {
  		this.keypressed = true;
  	}
  	document.onkeyup = () => {
  		this.keypressed = false;	
  	}
  	this.keypressed 
  		? new TableSelection().selectGroup(event)
  		: new TableSelection().select(event);
  }
}