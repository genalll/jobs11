class Popup {
    constructor(popup) {
        this.popup = popup;

    }
    open() {
        this.classTogle();
        if(this.popup.querySelector(".popup__button")){
        if (this.popup.getAttribute("id") == "popupedit") {
            const button = this.popup.querySelector(".popup__button_edit");
            button.removeAttribute('disabled');
            button.classList.add(`popup__button_active`);
        } else {
            const button = this.popup.querySelector(".popup__button");
            button.setAttribute('disabled', "disabled");
            button.classList.remove(`popup__button_active`);
            this.popup.querySelector(".popup__form").reset();
        }
        }
    }

    close() {
        this.classTogle();
    }
    classTogle() {
        const renderPopup = this.popup;
        renderPopup.classList.toggle('popup_is-opened');
    }
    

}
export {Popup};