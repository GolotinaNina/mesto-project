export function addOpenEvents(popup, elOpen, action) {
  elOpen.addEventListener("click", function (event) {
    event.stopPropagation();
    addOpenClass(popup);
    if (action != null) action();
  });
}

export function addCloseEvents(popup, elClose) {
  elClose.addEventListener("click", function () {
    removeOpenClass(popup);
  });
}

export function removeOpenClass(el) {
  el.classList.remove("popup_opened");
}

export function addOpenClass(el) {
  el.classList.add("popup_opened");
}

export function addElement(el) {
  elements.prepend(getElement(el));
}
