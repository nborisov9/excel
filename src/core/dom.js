class Dom {
	constructor(selector) {
		// #app
		if (typeof selector === 'string') {
			this.$el = document.querySelector(selector);
		} else {
			this.$el = selector;
		}
	}
	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this; // для того, чтобы мы могди делать chain (цепь)
		}
		return this.$el.outerHTML.trim();
	}

	text(text) {
		if (typeof text === 'string') {
			this.$el.textContent = text;
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}
		return this.$el.textContent.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	// возвращает data-id / data - уже созданный метод
	id(parse) {
		if (parse) {
			const parsed = this.id().split(':'); // split верент из строки массив
			return {
				row: +parsed[0],
				col: +parsed[1]
			};
		}
		return this.data.id;
	}

	// добавляет класс
	addClass(classname) {
		this.$el.classList.add(classname);
		return this;
	}

	removeClass(classname) {
		this.$el.classList.remove(classname);
		return this;
	}


	// функционал addEventListener
	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	// функционал removeEventListener
	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	// поиск чего-то одного
	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	focus() {
		this.$el.focus();
		return this; // для того, чтобы мы могди делать chain (цепь)
	}

	// element
	append(node) {
		if (node instanceof Dom) { // если node это объект класса Dom, то:
			node = node.$el;
		}
		if (Element.prototype.append) { // если такой метод есть в базовом классе Element, то:
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
		return this; // для того, чтобы мы могди делать chain (цепь)
	}

	get data() {
		return this.$el.dataset;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect(); // getBoundingClientRect - позвоилт поулчить координаты
	}

	findAll(selector) {
		return this.$el = document.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object
			.keys(styles) // выдает ключи объекта и возвращает их в массиве
			.forEach(key => { // перебирает каждые ключи объекта
				this.$el.style[key] = styles[key]; // example: style[key] - style['width'] и style['heigth'] / styles[key] - 120px...
			});
	}
}


// ф-ция $
// event.target
export function $(selector) {
	return new Dom(selector);
}

// делаем метод для $
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) { // если есть какие-то классы
		el.classList.add(classes);
	}

	return $(el);
};




