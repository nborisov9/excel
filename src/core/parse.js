export function parse(value = '') {
	if (value.startsWith('=')) {
		try {
			return eval(value.slice(1))
		} catch (e) {
			return value
		}
	}
}


// Метод startsWith() помогает определить,
// начинается ли строка с символов указаных в скобках,
// возвращая, соответсвенно, true или false.


// Конструкция try...catch пытается выполнить
// инструкции в блоке try, и, в случае ошибки, выполняет блок catch.

