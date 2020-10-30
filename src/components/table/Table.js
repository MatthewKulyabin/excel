import { ExcelComponent } from '@core/ExcelComponent.js';
import { $ } from '@core/dom.js';
import { createTable } from '@/components/table/table.template.js';
import { resizeHandler } from '@/components/table/table.resizing.js';
import { shouldResize, isCell } from '@/components/table/table.functions.js';
import { TableSelection, nextSelector } from '@/components/table/table.selection.js';
import { matrix } from '@core/utils.js';

export class Table extends ExcelComponent {
	static className = 'excel_table';

	constructor($root, options) {
		super($root, {
      name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
      ...options,
		});
	}

	toHTML() {
		return createTable(20);
	}

  prepare() {
    console.log('prepare');
    this.selection = new TableSelection();
  }

	init() {
		super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', ( ) => {
      this.selection.current.focus();
    })
	}

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

	onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}