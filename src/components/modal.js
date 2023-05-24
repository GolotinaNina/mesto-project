export const closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup  = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
};

export function addOpenEvents(popup, elOpen, callback) {
  elOpen.addEventListener("click", function (event) {
    event.stopPropagation();
    openPopup(popup);
    if (callback != null) callback();
  });
};

export function addCloseEvents(popup, elClose) {
  elClose.addEventListener("click", function () {
    closePopup(popup);
  });
};

export function closePopup(el) {
  el.classList.remove("popup_opened");
  document.removeEventListener('keydown',closePopupByEsc);
};

export function openPopup(el) {
  document.addEventListener('keydown',closePopupByEsc);
  el.classList.add("popup_opened");
};