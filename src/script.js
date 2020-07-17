import {UserInfo} from "./userInfo.js";
import {Popup} from "./popup.js";
import {FormValidator} from "./formvalidator";
import {CardList} from "./cardList";
import {Card} from "./card.js";
import {Api} from "./api.js";
import "./pages/index.css";

function script() {


    const server = NODE_ENV=== "development" ? "http://praktikum.tk/" : "https://praktikum.tk/";
    const palaceContener = document.querySelector(".places-list");
    const popupAddElement = document.querySelector("#popupadd");
    const imagePopupElement = document.querySelector(".imagepopup");
    const popupEditElement = document.querySelector("#popupedit");
    const heroName = document.querySelector(".user-info__name");
    const heroJob = document.querySelector(".user-info__job");
    const heroAvatar = document.querySelector(".user-info__photo");
    const info = new UserInfo(heroName, heroJob);
    const fetche = new Api({
        baseUrl: server+"cohort11",
        headers: {
            authorization: 'c0e103a1-800b-46bf-b7a3-9cc40f123c72',
            'Content-Type': 'application/json'
        }
    });
    function renderCardsweb(fetche) {
        fetche.getInitialCards()
            .then(data => {
                const showCard = data.map(function renderCard(element) {
                    return new Card(element.name, element.link);
                });
                const newCard = new CardList(palaceContener, showCard);
                newCard.render();
            }).catch((err) => {
                console.log(err);
            });
    }
    renderCardsweb(fetche);

    fetche.getUserInfoLoad()
        .then(data => {
            info.setUserInfo(data.name, data.about);
            info.updateUserInfo();
            heroAvatar.setAttribute('style', "background-image:" + "url('" + data.avatar + "');");
        }).catch((err) => {
            console.log(err);
        });
    //АПИ !


    function openImagePopup(event) {
        if (event.target.classList.contains('place-card__image')) {
            const popup = new Popup(imagePopupElement);
            this.removeEventListener('click', openImagePopup);
            const image = document.querySelector("#image");
            const src = event.target.getAttribute("style").split("'")[1];
            image.setAttribute('src', src);
            popup.open();
        }
    }

    function closeImagePopup(event) {
        if (event.target.id === 'popupimgclose') {
            const popup = new Popup(imagePopupElement);
            popup.close();
            document.addEventListener('click', openImagePopup);
        }
    }

    function openPopupAddCard() {
        const popupCardAdd = new Popup(popupAddElement);
        formValid.reserError(); //reserError() использую для устранения бага ранее закрытого popup c ошибками, дабы очащать ошибки не прибегая к валидации, тк событие инпут,ы повторно еще не состоялось.
        popupCardAdd.open();
    }

    function closePopupAddCard() {
        const popupform = new Popup(popupAddElement);
        popupform.close();
    }

    function openPopupEdit() {
        const popupEdit = new Popup(popupEditElement);
        popupEdit.popup.querySelector(".popup__input_type_name").value = info.nameValue;
        popupEdit.popup.querySelector(".popup__input_type_link-url").value = info.jobValue;
        formValidEdit.reserError();
        popupEdit.open();

    }

    function closePopupEdit() {
        const popupEdit = new Popup(popupEditElement);
        popupEdit.close();
    }

    function addformsItem(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const link = event.target.link.value;
        const cardAdds = new Card(name, link);
        palaceContener.appendChild(cardAdds.create());
        closePopupAddCard();
        event.target.reset();
    }

    function editNameJob(event) {
        event.preventDefault();
        let name = event.target.name.value;
        let job = event.target.job.value;
        //АПИ!
        fetche.getRenameUser(name, job)
            .then(data => {
                info.setUserInfo(data.name, data.about);
                info.updateUserInfo();
                closePopupEdit();
                event.target.reset();
            })
            .catch((err) => {
                console.log(err);// теперь в catch попадёт и ошибка сети, и ошибка сервера.
            });
        //АПИ!
    }

    document.addEventListener('click', openImagePopup);

    document.addEventListener('click', closeImagePopup);

    document.querySelector("#popupaddopen").addEventListener('click', openPopupAddCard);

    document.querySelector(".popup__close").addEventListener('click', closePopupAddCard);

    document.querySelector("#userinfoeditbutton").addEventListener('click', openPopupEdit);

    document.querySelector("#popupeditclosebutton").addEventListener('click', openPopupEdit);

    document.forms.new.addEventListener('submit', addformsItem);

    document.forms.edit.addEventListener('submit', editNameJob);

    const formValid = new FormValidator(document.forms.new);
    const formValidEdit = new FormValidator(document.forms.edit);

    formValid.valid();
    formValidEdit.valid();
};
script();
export {script};

