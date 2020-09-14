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

	clear() {
		this.html('');
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




