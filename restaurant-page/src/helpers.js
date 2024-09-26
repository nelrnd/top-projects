export function create(tagName, content, className) {
  const elem = document.createElement(tagName)
  elem.textContent = content
  elem.classList.add(className)
  return elem
}

export function addTo(parentElem, childElem) {
  if (childElem) {
    parentElem.appendChild(childElem)
  } else {
    return function (childElem) {
      parentElem.appendChild(childElem)
    }
  }
}

export function displayTo(parentElem) {
  const add = addTo(parentElem)
  return function (childElem) {
    parentElem.innerHTML = null
    add(childElem)
  }
}