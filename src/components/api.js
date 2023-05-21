const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-24",
  headers: {
    authorization: "68fdd3a9-a749-43e0-ad66-26fdd6a6cb73",
    "Content-Type": "application/json",
  },
};

export const getProfileData = (setProfileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(getPromiseResult)
    .then((res) => {
      personalData = res;
      setProfileData(res.name, res.about);
    });
};

export let personalData = {};

export const patchProfileData = (name, about, setProfileData) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(getPromiseResult)
    .then((res) => {
      personalData = res;
      setProfileData(res.name, res.about);
    })
    .catch((err) => {
      console.log(err); 
    });
};

export const postCard = (name, link, addElement) => {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(getPromiseResult)
    .then((el) => {
      addElement(el);
    });
};

export const deleteCard = (id, card) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getPromiseResult)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err); 
    });
};

export const putLike = (id, counter, likeButton, setCount) => {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getPromiseResult)
    .then((res) => {
      setCount(counter, res.likes.length);
      likeButton.classList.toggle("element__like-button_status");
    })
    .catch((err) => {
      console.log(err); 
    });
};

export const deleteLike = (id, counter, likeButton, setCount) => {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getPromiseResult)
    .then((res) => {
      setCount(counter, res.likes.length);
      likeButton.classList.toggle("element__like-button_status");
    })
    .catch((err) => {
      console.log(err); 
    });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getPromiseResult);
};

function getPromiseResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}