import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce, getFullDate} from '@core/utils'
import {normalizeInitialState} from '@/redux/initialState'
import {changeOpenDate} from '@/redux/actions';

import {Page} from '@core/Page';

function storageName(param) {
	return 'excel:' + param;
}

export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();

		const state = storage(storageName(this.params));
		const initialState = normalizeInitialState(state);
		const store = createStore(rootReducer, normalizeInitialState(state));

		const curDate = getFullDate(new Date());
		store.dispatch(changeOpenDate(curDate));

		const stateListener = debounce(state => {
		  storage(storageName(params), state);
		}, 300)

		store.subscribe(stateListener);

		this.excel = new Excel({
		  components: [Header, Toolbar, Formula, Table],
		  store,
		});
		this.$el = this.excel.getRoot();
		return this.$el;
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
		this.$el.remove();
	}
}
