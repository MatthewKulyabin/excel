export class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
		this.current = null;
	}

	select($el) {
		this.clear();
		$el.focus().addClass(TableSelection.className);
		this.group.push($el);
		this.current = $el;
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup($els) {
		this.clear();
		$els.forEach($c => {
			this.group.push($c);
			$c.addClass(TableSelection.className);
		})
	}
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"`;
}