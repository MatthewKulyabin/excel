import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
	static className = 'excel_header';

	toHTML() {
		return `
			<input type="text" class="input" value="New table" />

				<div>
					
					<div class="button">
						<span class="material-icons">delete</span>
					</div>

					<div class="button">
						<span class="material-icons">exit_to_app</span>
					</div>

				</div>
		`;
	}
}