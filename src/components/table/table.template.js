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

// засчет замыкания сохоаняется инедекс - row и ф-ция с помощью метода map вызывается с текущими значениями: _ col
function toCell(row) {
	return function(_, col) {
		return `
			<div class="cell"
				contenteditable
				data-col="${col}"
				data-type="cell"
				data-id="${row}:${col}">
			</div>
		`;
	};
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
	for (let row = 0; row < rowsCount; row++) {
		// генерируем ячейки
		const cells = new Array(colsCount) // colsCount - количество мест
				.fill('') // создаем пустые места в массиве
				// .map((_, col) => toCell(row, col)) // заполняем массив сожержимым метода toCell
				.map(toCell(row))
				.join('');

		rows.push(createRow(row + 1, cells)); // i - цифры в строках / cells - сколько всего ячеек
	}

	return rows.join('');
}











