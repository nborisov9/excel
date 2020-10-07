// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

// =========================
// Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза в ms миллисекунд.
// Другими словами, когда мы вызываем debounce, это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

// debounce - ф-ция выосокого порядка, которая возвращает ф-цию, модифицирует функционал

// идея в том, что если мы будем попадать в ф-цию debounce, мы будем чистить timeout и заново его запускать

export function debounce(fn, wait) {
  let timeout
  return function(...args) { // аргуементы, которые приходят в debounce, мы собираем в ...args
    const later = () => {
      clearTimeout(timeout) // чистит timeout
      fn(...args) // вызывает fn с аргументами || fn.apply(this, args)
    }
    clearTimeout(timeout) // чистит timeout
    timeout = setTimeout(later, wait)
  }
}

// example deboucne
// debounce сохраняет изменения только спустя 300мс,
// то есть если я введу большой текст подряд и отпущу последнюю клавишу - то
// он сохранит сразу большой текст
// а раньше он бы сохранял изменение каждого нового введенного символа и был бы огромный спам изменений


export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}


export function preventDefault(event) {
  event.preventDefault()
}