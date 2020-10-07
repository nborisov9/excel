import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router')
		}

		this.$placeholder = $(selector)
		this.routes = routes
		this.page = null

		// забиндим метод
		// this.changePageHandler привязываем контекст this в contructor'e
		// чтобы в методе changePageHandler использовать this
		this.changePageHandler = this.changePageHandler.bind(this)

		this.init()
	}

	// нужно проинциализировать, какая у нас текущая страница
	init() {
		// если прописать this.changePageHandler.bind(this) то не сможем удалить потом этот слушатель
		window.addEventListener('hashchange', this.changePageHandler)
		// метода init() недостаточно, потому что он только добавляет прослушку события, поэтому сразу вызываем метод
		this.changePageHandler()
	}

	// ActiveRoute.path - измененный url
	changePageHandler() {
		// когда мы меняем страницу, мы не уничтожаем предыдущую страницу, поэтому
		// у this.page мы вызываем метод destroy()
		if (this.page) {
			this.page.destroy()
		}

		this.$placeholder.clear() // при переходе на другую страницу очищает html


		const Page = ActiveRoute.path.includes('excel')
		? this.routes.excel
		: this.routes.dashboard

		this.page = new Page()

		this.page = new Page(ActiveRoute.param)

		this.$placeholder.append(this.page.getRoot()) // отвечает за появление html струткуры
		this.page.afterRender() // отвечает за появление интерактива на странице
	}

	destroy() {
		// удаляем слушатель
		window.removeEventListener('hashchange', this.changePageHandler)
	}
}