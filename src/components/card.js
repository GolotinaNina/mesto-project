import {addOpenEvents, popupExpandPicture, openPopupImage, popupPicture} from './modal';
import { setCount, deleteCard, putLike, deleteLike, personalData } from "./data";

const userTemplate = document.querySelector("#elTemplate").content;
const elements = document.querySelector(".elements");

export function addElement(el) {
  elements.prepend(getElement(el));
}

function getElement(el) {
  const userElement = userTemplate.querySelector(".element").cloneNode(true);
  const delButton = userElement.querySelector(".element__delete");
  const photo = userElement.querySelector(".element__photo");
  const likeButton = userElement.querySelector(".element__like-button");
  const counter = userElement.querySelector(".counter");

  userElement.id = el._id;

  if (el.owner._id != personalData._id) delButton.remove();
  else
    delButton.addEventListener("click", () => deleteCard(el._id, userElement));

  photo.setAttribute("src", el.link);
  photo.setAttribute("alt", el.name);
  userElement.querySelector(".element__place-name").textContent = el.name;

  if (el.likes.map((x) => x._id).includes(personalData._id))
    likeButton.classList.toggle("element__like-button_status");

  setCount(counter, el.likes.length);

  likeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    if (this.classList.contains("element__like-button_status"))
      deleteLike(el._id, counter, this);
    else putLike(el._id, counter, this);
  });

  addOpenEvents(popupExpandPicture, photo, () =>
    openPopupImage(el.name, el.link, popupPicture)
  );

  return userElement;
}
