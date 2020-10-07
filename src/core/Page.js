export class Page {
	 constructor(params) {
		 this.params = params
	 }

	 // возвращает коренвой элемент
	 getRoot() {
		throw new Error('Method "getRoot" should be implemented')
	 }

	 // метод, чтобы понимать когда страница зарендерилась и ее шаблон готов к инициализации
	 afterRender() {

	 }

	 // при смене страницы нам нужно уничитожать определенные страницы
	 destroy() {

	 }
}