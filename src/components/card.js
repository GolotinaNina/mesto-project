const cardTemplate = document.querySelector("#elTemplate").content;

export function createCard(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  const delButton = card.querySelector(".element__delete");
  const photo = card.querySelector(".element__photo");
  const likeButton = card.querySelector(".element__like-button");
  const counter = card.querySelector(".counter");

  card.id = el._id;

  if (!isMyElement(el)) delButton.remove();
  else delButton.addEventListener("click", () => cbDeleteCard(el, card));

  photo.setAttribute("src", el.link);
  photo.setAttribute("alt", el.name);
  card.querySelector(".element__place-name").textContent = el.name;

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

  return card;
}

export function setCount(counter, count) {
  if (count > 0) counter.textContent = count;
  else counter.textContent = "";
}