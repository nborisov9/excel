import {Page} from '@core/Page'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {debounce, storage} from '@core/utils'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'


// формирует название в localStorage
function storageName(param) {
	return 'excel:' + param
}


export class ExcelPage extends Page {
	getRoot() {
	const params = this.params ? this.params : Date.now().toString()
	const state = storage(storageName(params))
	const store = createStore(rootReducer, normalizeInitialState(state))

	const stateListener = debounce(state => {
 		storage(storageName(params), state)
	}, 300) // 300 - коилчество секунд задержки между изменениями

	store.subscribe(stateListener)

	this.excel = new Excel({
		components: [Header, Toolbar, Formula, Table],
		store
	})

	// выводим excel на экран
	return this.excel.getRoot()

// example deboucne
// debounce сохраняет изменения только спустя 300мс,
// то есть если я введу большой текст подряд и отпущу последнюю клавишу - то
// он сохранит сразу большой текст
// а раньше он бы сохранял изменение каждого нового введенного символа и был бы огромный спам изменений
	}

	// после рендера добавляем интерактив на страницу через метод init()
	// который находится в excel
	afterRender() {
		this.excel.init()
	}

	destroy() {
		this.excel.destroy()
	}
}
