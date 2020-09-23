// observer

export class Emitter {
	constructor() {
		this.listeners = {};
	}

	// Уведомляем слушателей если они есть
	// eventName - то, что передаем, например строку 'formula:done'
	// table.emit('table:select', {a: 1})
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) { // если this.listeners[event] не массив
			return false; // тогда возвращаем false
		}
		this.listeners[event].forEach(listener => {
			listener(...args); // это и есть та ф-ция, которую складывали в subscribe в push()
		});
		return true;
	}

	// подписываемся на уведомления
	// добавляем нового слушателя
	// formula.subscribe('table:select', () => {}) - то что будем передавать (пример)
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []; // обращаемся к объекту по ключу event и делаем этот ключ массивом
		this.listeners[event].push(fn); // добавляем в массив функцию
		return () => { // функция позволяющая отписаться
			this.listeners[event] =
				this.listeners[event].filter(listener => listener !== fn); // оставляем все listener, которые не равны fn
		};
	}
}






// // Example
// const emitter = new Emitter();

// emitter.subscribe('vladilen', data => console.log('sub:', data)); // для начала нужно подписаться на событие

// emitter.emit('vladilen', 4222); // выводим событие

