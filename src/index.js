import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {initialState} from '@/redux/initialState'
import './scss/index.scss'

const store = createStore(rootReducer, initialState)


const stateListener = debounce(state => {
  console.log('App State: ', state)
  storage('excel-state', state)
}, 300) // 300 - коилчество секунд задержки между изменениями

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()

// example deboucne
// debounce сохраняет изменения только спустя 300мс,
// то есть если я введу большой текст подряд и отпущу последнюю клавишу - то
// он сохранит сразу большой текст
// а раньше он бы сохранял изменение каждого нового введенного символа и был бы огромный спам изменений

// ============================================================================================================