import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {matrix, nextSelector, isCell, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		});
	}

	toHTML() {
		return createTable(20);
	}

	prepare() {
		this.selection = new TableSelection(); // структура для внесения изменений в класс TableSelection
	}

	init() {
		super.init(); // родительский метод / вызывает базовые состовляющие (иначе не будет работать resize)

		const $cell = this.$root.find('[data-id="0:0"]');
		this.selection.select($cell); // передаем в метод select базовую ячейку
		this.$emit('table:select', $cell);

		// переносим текс из формулы в ячейки
		this.$on('formula:input', text => {
			this.selection.curent.text(text);
		});

		// передаем фокус из формулы к текущей ячейке
		this.$on('formula:done', () => {
			this.selection.curent.focus();
		});
	}



	onMousedown(event) {
		if (shouldResize(event)) { // фц-ия првоерки в table.functions.js
			resizeHandler(this.$root, event); // весь функционал resize (tablae.resize.js)
		} else if (isCell(event)) {
			const $target = $(event.target); // $ instanceof DOM === true
			if (event.shiftKey) {
				const target = $target.id(true); // текущий клик / id - метод из dom.js
				const curent = this.selection.curent.id(true); // последняя выбранная ячейка

				const $cells = matrix(target, curent)
						.map(id => this.$root.find(`[data-id="${id}"]`)); // divs с атрибутами data-id="1:1" и тд
				this.selection.selectGroup($cells);
			} else {
				this.selection.select($target);
				this.$emit('table:select', $target);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowUp',
			'ArrowDown',
			'ArrowRight',
			'ArrowLeft'
		];

		const {key} = event;

		if (keys.includes(key) && !event.shiftKey) { // && !event.shiftKey для того, чтобы при зажатом shift + enter перемещались по текстиу вниз
			event.preventDefault();
			const id = this.selection.curent.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selection.select($next);

			this.$emit('table:select', $next);
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target));
	}
}








