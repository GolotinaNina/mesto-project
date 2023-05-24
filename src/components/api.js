const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-24",
  headers: {
    authorization: "68fdd3a9-a749-43e0-ad66-26fdd6a6cb73",
    "Content-Type": "application/json",
  },
};

export const getProfileData = () => 
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getPromiseResult);

export const patchProfileData = (name, about) => 
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(getPromiseResult);

export const patchAvatar = (avLink) => 
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avLink,
    }),
  }).then(getPromiseResult);

export const postCard = (name, link) => 
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getPromiseResult);

export const deleteCard = (id) => 
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getPromiseResult);

export const putLike = (id) => 
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getPromiseResult);

export const deleteLike = (id) => 
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getPromiseResult);

export const getInitialCards = () => 
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getPromiseResult);

function getPromiseResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}