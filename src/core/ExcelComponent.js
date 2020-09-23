import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter; // instanseof класса Emitter, находится в объекте options под ключом emitter
		this.unsubscribers = []; // содержит отписанные функции

		this.prepare();
	}

	// Настраиваем наш компонент lj штше
	prepare() {

	}

	// возвращает шаблон компонента
	toHTML() {
		return '';
	}

	// уведомляем слушателей про событие event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	// попдисываемся на событие event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn); // когда подписываемся, мы получаем функцию из subscribe с возможностью отписаться
		this.unsubscribers.push(unsub); // складываем новые функции в массив
	}

	// инициализируем наш компонент
	// добавляем DOM слушателей
	init() {
		this.initDOMListeners();
	}

	// удаляем компонент
	// чистим DOM слушателей
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsub => unsub());
	}
}
