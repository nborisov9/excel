const CODES = {
	A: 65,
	Z: 90
};

// структура column
function toColumn(col, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}


// структура cell
function toCell(_, col) {
	return `
		<div class="cell" contenteditable data-col="${col}">
			
		</div>
	`;
}


// структура строк
function createRow(index, content) {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
	return `
		<div class="row" data-type="resizable">
			<div class="row-info">
				${index ? index : ''}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}


export function createTable(rowsCount = 15) { // по умолчанию кол-во строк 15
	const colsCount = CODES.Z - CODES.A + 1; // 25 столбцов
	const rows = [];

	const cols = new Array(colsCount)
		.fill('') // colsCount в данном случ. длина массива / fill() -заполняет массив одинаковыми элементами
		.map((_, index) => {
			return String.fromCharCode(CODES.A + index);
		})
		.map((el, index) => {
			return toColumn(el, index);
		})
		.join('');

	rows.push(createRow(null, cols)); // A, B, C ... Z

	// генерирует строки сверху вниз
	for (let i = 0; i < rowsCount; i++) {
		// генерируем ячейки
		const cells = new Array(colsCount) // colsCount - количество мест
				.fill('') // создаем пустые места в массиве
				.map(toCell) // заполняем массив сожержимым метода toCell
				.join('');

		rows.push(createRow(i + 1, cells)); // i - цифры в строках
	}

	return rows.join('');
}











