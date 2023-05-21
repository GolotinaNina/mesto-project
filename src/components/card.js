const userTemplate = document.querySelector("#elTemplate").content;

export function getElement(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked) {
  const userElement = userTemplate.querySelector(".element").cloneNode(true);
  const delButton = userElement.querySelector(".element__delete");
  const photo = userElement.querySelector(".element__photo");
  const likeButton = userElement.querySelector(".element__like-button");
  const counter = userElement.querySelector(".counter");

  userElement.id = el._id;

  if (!isMyElement(el)) delButton.remove();
  else delButton.addEventListener("click", () => cbDeleteCard(el, userElement));

  photo.setAttribute("src", el.link);
  photo.setAttribute("alt", el.name);
  userElement.querySelector(".element__place-name").textContent = el.name;

  if (isLiked(el))
    likeButton.classList.toggle("element__like-button_status");

  setCount(counter, el.likes.length);

  likeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    cbLike(el, counter, this)
  });

  photo.addEventListener("click", function (event) {
    event.stopPropagation();
    cbOnOpenPopupImage(el);
  });

  return userElement;
}

export function setCount(counter, count) {
  if (count > 0) counter.textContent = count;
  else counter.textContent = "";
}