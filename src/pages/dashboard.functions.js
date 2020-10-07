import {storage} from '@core/utils'

// возвращает кусок верстки
function toHTML(key) {
	const module = storage(key)
	const id = key.split(':')[1]

	return `
		<li class="db__record">
			<a href="#excel/${id}">${module.title}</a>
			<strong>
				${ new Date(module.openedDate).toLocaleDateString() }
				${ new Date(module.openedDate).toLocaleTimeString() }
			</strong>
		</li>
	`
}

// получаем данные из localStorage, которые соответсвуют этому паттерну:
// excel:1231213
function getAllKeys() {
	const keys = []
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i) // получаем соответсвующий ключ из loalStorage
		if (!key.includes('excel')) { // если localStorage не содержит ключ excel, то:
			continue // завершаем текущую итерацию и продолжаем со следующей
		}
		keys.push(key) // *пушим в массив keys все ключи из localStorage
	}

	return keys // получаем нужный ключ из localStorage в массиве
}

export function createRecordsTable() {
	const keys = getAllKeys()

	// если массив пустой, мы показываем эту запись
	if (!keys.length) {
		return `<p>Вы пока не создали не одной таблицы</p>`
	}

	return `
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>
		<ul class="db__list">
			${keys.map(toHTML).join('')}
		</ul>
	`
}