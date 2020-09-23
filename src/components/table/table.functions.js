// functions helper
import {range} from '@core/utils';


// ==============================================================================================================================



export function shouldResize(event) {
	return event.target.dataset.resize;
}

// ==============================================================================================================================



export function isCell(event) {
	return event.target.dataset.type === 'cell';
}


// ==============================================================================================================================


export function matrix(target, curent) {
	const cols = range(curent.col, target.col); // массив из колонок, который находится между этими двумя элеменатми
	const rows = range(curent.row, target.row);

	// с помощью reduce, мы можем соединить 2 массива
	return cols.reduce((acc, col) => { // col - сами колонки
		rows.forEach(row => acc.push(`${row}:${col}`));
		return acc;
	}, []); // acc и [] одно и то же
}

// ==============================================================================================================================

// key - один из элементов массива
export function nextSelector(key, {col, row}) { // {col, row} - id.col and id.row
const MIN_VALUE = 0;

	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++;
			break;

		case 'Tab':
		case 'ArrowRight':
			col++;
			break;

		case 'ArrowUp':
			row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
			break;

		case 'ArrowLeft':
			col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
			break;
	}
	return `[data-id="${row}:${col}"]`;
}