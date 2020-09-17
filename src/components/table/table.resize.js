import {$} from '@core/dom';


export function resizeHandler($root, event) {
	const $resizer = $(event.target); // Dom {$el: div.col-resize} // $() - относит что лтбо к классу Dom
	const $parent = $resizer.closest('[data-type="resizable"]'); // получим родителя по data аттрибуту
	const coords = $parent.getCoords();
	const type = $resizer.data.resize;
	let value;
	const sideProp = type === 'col' ? 'bottom' : 'right';


	$resizer.css({
		opacity: 1, // при клике добавляем стили синмему курсору
		[sideProp]: '-5000px'
	});



	document.onmousemove = e => {
		if (type === 'col') {
			// delta - разница сдиижения от левого края до правого
			const delta = e.pageX - coords.right;
			value = coords.width + delta; // результат свдижения
			$resizer.css({right: -delta + 'px'});
		} else {
			const delta = e.pageY - coords.bottom; // разница сдвижения
			value = coords.height + delta; // сложив текущую высоту + разницу смещения высоты, получаем новую высоту
			$resizer.css({bottom: -delta + 'px'});
		}
	};

	// когда происходит события mouseup (поднимаем мышку) , то события mousemove заканчивается
	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;

		if (type === 'col') {
			$parent.css( {width: value + 'px'} ); // ширина родителя + разница сдвижения от левого края к правому
			$root.findAll(`[data-col="${$parent.data.col}"]`) // findAll() наш созданный метод - querySelectorAll
					.forEach(el => el.style.width = value + 'px');
		} else {
			$parent.css( {height: value + 'px'} );
		}

		$resizer.css({
			opacity: 0, // когда отпускаем мышь, задаем opacity 0
			bottom: 0,
			right: 0
		});
	};
}