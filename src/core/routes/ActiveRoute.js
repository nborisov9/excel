// класс отвечаюищй за взаимодействие с активным route +
// прогармная навигация
export class ActiveRoute {
	// get возвращает текущий путь который есть в стркое url
	static get path() {
		return window.location.hash.slice(1) // измененный url
	}

	static get param() {
		return ActiveRoute.path.split('/')[1] // получаем значение после слеша
	}

	// изменяет url (можно добавить пустую строку для удаления url)
	static navigate(path) {
		window.location.hash = path
	}
}