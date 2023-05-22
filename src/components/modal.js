export const closePopupByEsc = (evt) => {
  evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      evt.stopPropagation();
      let el = document.querySelector('.popup_opened');
      if (el != null){
        removeOpenClass(el);
      }
    }
};

export function addOpenEvents(popup, elOpen, callback) {
  document.addEventListener('keydown',(event) => closePopupByEsc(event));
  elOpen.addEventListener("click", function (event) {
    event.stopPropagation();
    addOpenClass(popup);
    if (callback != null) callback();
  });
};

export function addCloseEvents(popup, elClose) {
  elClose.addEventListener("click", function () {
    removeOpenClass(popup);
  });
};

export function removeOpenClass(el) {
  el.classList.remove("popup_opened");
  document.removeEventListener('keydown',(event) => closePopupByEsc(event));
};

export function addOpenClass(el) {
  el.classList.add("popup_opened");
};

export function onOpenPopupImage(name, link, elPopupPicture, cbUpdateDescription) {
  elPopupPicture.setAttribute("src", link);
  elPopupPicture.setAttribute("alt", name);

  cbUpdateDescription(name);
};

export function updatePopupValues(cbUpdateValues,cbCheckFormIsValid) {
  cbUpdateValues();
  cbCheckFormIsValid();
};