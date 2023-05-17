const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
    headers: {
      authorization: '01a3fc80-66ed-437d-82ce-f240976e36ea',
      'Content-Type': 'application/json'
    }
  }

export let personalData = {};  

export const patchProfileData = (name, about) =>{
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then(getPromiseResult)
    .then(res => {
        personalData = res;
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

export const postCard = (name, link) => {
    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
    })
    .then(getPromiseResult)
    .then(el => {
        addElement(el);
    });
}

export const deleteCard = (id, card) =>{
    fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getPromiseResult)
    .then(() => {
        card.remove();
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

export const putLike = (id, counter, likeButton) =>{
    fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(getPromiseResult)
    .then((res) => {
        setCount(counter, res.likes.length);
        likeButton.classList.toggle('element__like-button_status');
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

export const deleteLike = (id, counter, likeButton) =>{
    fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getPromiseResult)
    .then((res) => {
            setCount(counter, res.likes.length);
            likeButton.classList.toggle('element__like-button_status');
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(getPromiseResult);
} 

function getPromiseResult(res){
    if (res.ok) {
          return res.json();
        }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}