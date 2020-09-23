import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	// если добавляется содержимое в listeners, то к нему нужно писать метод
	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options
		});
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`;
	}

	init() {
		super.init();

		this.$formula = this.$root.find('#formula');

		// текст из ячейки в формулу при перемещении клавиш и при клике
		this.$on('table:select', $cell => { // $cell - это $el: div.cell.selected
			this.$formula.text($cell.text()); // передаем текст, который в яейке в формулу
		});

		this.$on('table:input', $cell => {
			this.$formula.text($cell.text()); // передаем текст, который в яейке в формулу
		});
	}


	onInput(event) {
		const text = event.target.textContent.trim();
		this.$emit('formula:input', text);
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];

		if (keys.includes(event.key)) { // если массив keys содержит в себе event.key
			event.preventDefault();
			this.$emit('formula:done'); // переносит фокус с формулы на текущую ячейку
		}
	}
}