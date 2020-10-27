export class TableSelection {
	static selected = new Set();

	select(event) {
		if (event.target.dataset.cell === 'true') {
			if (TableSelection.selected.size > 0) {
				for (const select of TableSelection.selected) {
					select.classList.remove('selected');
					TableSelection.selected.delete(select);
				}
			}
			event.target.classList.add('selected');
			TableSelection.selected.add(event.target);
		}
	}

	selectGroup(select) {
		if (event.target.dataset.cell === 'true') {
			event.target.classList.add('selected');
			TableSelection.selected.add(event.target);
		}
	}
}