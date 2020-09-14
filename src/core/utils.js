export function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}

	// charArt() - получаем какой либо символ по индексу
	return string.charAt(0).toUpperCase() + string.slice(1);
}

