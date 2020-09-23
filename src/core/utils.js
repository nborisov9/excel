export function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}

	// charArt() - получаем какой либо символ по индексу
	return string.charAt(0).toUpperCase() + string.slice(1);
}


// разница массивов
export function range(start, end) {
	if (start > end) { // если start > end, то меняем их местами, (т.к нам важен диапазон)
		[end, start] = [start, end]; // поменяли местами, теперь start = end и тд
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index);
}
// inpit: 0,3 / если curent.col = 0 / target.col = 3, то получаем массив:
// output: [0, 1, 2, 3]