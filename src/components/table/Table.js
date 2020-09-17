import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		});
	}

	toHTML() {
		return createTable(20);
	}


	onMousedown(event) {
		if (shouldResize(event)) { // фц-ия првоерки в table.functions.js
			resizeHandler(this.$root, event); // весь функционал resize (tablae.resize.js)
		}
	}
}
