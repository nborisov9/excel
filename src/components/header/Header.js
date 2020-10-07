import {ExcelComponent} from '@core/ExcelComponent'
import {defaultTitle} from '@/constants'
import {changeTitle} from '@/redux/actions'
import {$} from '@core/dom'
import {ActiveRoute} from '../../core/routes/ActiveRoute'


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)
    const dataset = $target.data

    if (dataset.button === 'remove') {
        const desision = confirm('Вы действительно хотите удалить данную табилцу?')
        if (desision) {
          localStorage.removeItem('excel:' + ActiveRoute.param)
          ActiveRoute.navigate('')
        }
    } else if (dataset.button === 'exit') {
        ActiveRoute.navigate('')
    } else {
      event.preventDefault()
    }
 }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()))
  }
}
