const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const userTemplate = document.querySelector('#elTemplate').content;
const elements = document.querySelector('.elements');

const popupEditProfile = document.querySelector('#popup__edit_profile');
const buttonEditProfile = document.querySelector('#profile__edit');
const buttonCloseEditProfile = popupEditProfile.querySelector('button.popup__close');
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const profile = document.querySelector('.profile');

const popupExpandPicture = document.querySelector('#popup__expand_picture');
const buttonCloseExpandPicture = popupExpandPicture.querySelector('button.popup__close');

const popupNewPlace = document.querySelector('#popup__new_place');
const buttonNewPlace = document.querySelector('#element__add');
const buttonCloseNewPlace = popupNewPlace.querySelector('button.popup__close');
const formNewPlace = popupNewPlace.querySelector('.edit-new');

function initElements() {
    for (let i = initialCards.length - 1; i >= 0; i--) {
        addElement(initialCards[i]);
    }
}

function addOpenCloseEvents(popup, elOpen, elClose){
    elOpen.addEventListener('click', function (event) {
        popup.classList.add('popup_opened');
    }); 

    elClose.addEventListener('click',function(event){
        popup.classList.remove('popup_opened');
    });
};

buttonCloseExpandPicture.addEventListener('click',function(event){
    popupExpandPicture.classList.remove('popup_opened');
});

function addElement(el) {

    let userElement = userTemplate.querySelector('.element').cloneNode(true);

    userElement.querySelector('.element__photo').setAttribute('src', el.link);
    userElement.querySelector('.element__photo').setAttribute('alt', el.name);
    userElement.querySelector('.element__place-name').textContent = el.name;
    elements.prepend(userElement);

    userElement.querySelector('.element__delete').parentElement.addEventListener('click', function(event){
        this.remove();
    });

    userElement.querySelector('.element__like-button').addEventListener('click', function(event){
        event.stopPropagation();
        this.classList.toggle('element__like-button_status');
    });
}

initElements();

function expandPicture(el,event){
    let name = el.getAttribute('alt');
    let link = el.getAttribute('src');

    event.stopPropagation();
    popupExpandPicture.classList.add('popup_opened');
    let picture = popupExpandPicture.querySelector('.popup__picture');
    picture.setAttribute('src', link);
    picture.setAttribute('alt', name);

    popupExpandPicture.querySelector('.popup__description').textContent = name;
};

addOpenCloseEvents(popupEditProfile, buttonEditProfile, buttonCloseEditProfile);

formEditProfile.addEventListener('submit', function(event){
    let name = popupEditProfile.querySelector('.edit-form__input[name="name"]').value;
    let about = popupEditProfile.querySelector('.edit-form__input[name="about"]').value;

    profile.querySelector('.profile__name').textContent = name;
    profile.querySelector('.profile__about').textContent = about;
    
    event.preventDefault();
    popupEditProfile.classList.remove('popup_opened');
});

addOpenCloseEvents(popupNewPlace, buttonNewPlace, buttonCloseNewPlace);

formNewPlace.addEventListener('submit', function(event){
    let name = popupNewPlace.querySelector('.edit-new__input[name="name"]').value;
    let link = popupNewPlace.querySelector('.edit-new__input[name="link"]').value;

    event.preventDefault();
    addElement({name, link});
    popupNewPlace.classList.remove('popup_opened');
});
