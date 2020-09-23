// выделение ячеек
export class TableSelection {
	static className = 'selected'

	constructor() {
		this.group = []; // хранит все ячейки, которые выбирались
		this.curent = null; // хранит текущую выбранную ячейку (последнюю ячейку которая выбиралась)
	}


	// активная ячейка по умолчанию + активаня ячейка при клике
	// $el instanceof DOM === true
	select($el) {
		this.clear();
		this.group.push($el); // передаем элемент из Dom структуры (файл dom.js)
		this.curent = $el; // когда делаем выбор одной ячейки - this.curent - становится этим элементом
		$el.focus().addClass(TableSelection.className); // фокус добавляется вместе с классом
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className)); // удаляем класс активности с предыдущей ячейки, при клике на новую
		this.grpup = []; // чистим массив при клике на другую ячейку
	}

	selectGroup($group = []) {
		this.clear();

		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.className)); // всей группе добавляем класс активности
	}
}