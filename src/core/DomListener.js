import {capitalize} from '@core/utils';

export class DomListener {
	// $root - корневой элемент на который мы будем вешать различные слушатели
	constructor($root, listeners = []) {
		// должен быть предоставлен определенный $root
		if (!$root) {
			throw new Error('No $root provided for DomListener');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	// добавление слушателей
	initDOMListeners() {
		// console.log(this.listeners, this.$root);
		this.listeners.forEach(listener => {
			const method = getMethodName(listener); // содержит строку onClick

			if (!this[method]) {
				const name = this.name || '';
				throw new Error(
						`Method ${method} is not in ${name} Component`
					);
			}

			// this.$root - корневой элемент каждого из компонентов
			// on() - то же самое, что и addEventListener
			// listener - это и есть событие, к примеру input или click
			// console.log(this) - выдаст все содержимое нужного класса
			// this[method] == this['onInput'] / onInput - метод класса, таким образом мы можем обратиться к нужному методу класса
			// метод bind не вызывает функцию, а возвращает функцию, которая привязала себе новый контекст
			this[method] = this[method].bind(this); // теперь этот метод куда бы мы его не передавали, всегда будет с контекстом this и можем использовать в методе removeDOMListeners() и все будет работать
			this.$root.on(listener, this[method]); // когда вызываем метод таким образом: this[method], то контекст this теряется и мы не можем использовать this дальше / поэтому привязываем this с помощью bind
		});
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);

			this.$root.off(listener, this[method]);
		});
	}
}


function getMethodName(eventName) {
	return 'on' + capitalize(eventName);
}


