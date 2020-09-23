import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || []; // options.components - обращение к названию переменной, при реализации options / чтобы выводило каждый класс
		this.emitter = new Emitter(); // общий объект
	}

// переносим верстку
// метод $.create находится в dom.js
	getRoot() {
		const $root = $.create('div', 'excel');

		const componentsOptions = {
			emitter: this.emitter
		};

		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className);
			const component = new Component($el, componentsOptions); // содержимое каждого класса компонента / $el - $root для DOMListener
			// // DEBUG
			// if (component.name) {
			// 	window['c' + component.name] = component;
			// }
			$el.html(component.toHTML());
			$root.append($el); // внутрь класса .exel кладем калссы каждого блока
			return component; // map возвращает instanceof(объект) каждого класса Component
		});

		return $root;
	}

	render() {
		this.$el.append(this.getRoot()); // добавляем в наш selector какое либо содердимое
		this.components.forEach(component => {
			component.init();
		});
	}

	destroy() {
		this.components.forEach(component => component.destroy());
	}
}
