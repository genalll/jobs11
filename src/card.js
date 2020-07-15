class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    create() {
        const cardElement = document.createElement('div');
        const listImage = document.createElement('div');
        const placeCardDeleteBtn = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardLikeIcon = document.createElement('button');

        placeCardDescription.classList.add("place-card__description");
        placeCardDeleteBtn.classList.add("place-card__delete-icon");
        listImage.classList.add("place-card__image");
        cardElement.classList.add("place-card");
        placeCardName.classList.add("place-card__name");
        placeCardLikeIcon.classList.add("place-card__like-icon");
        
        /** REVIEW: Можно лучше: 
         * 
         * Для того, чтобы установить background image для элемента, рекомендуется спользовать интерполяцию строк из ES6 
         * Например: element.style.backgroundImage = `url(${this.url})`;
         * 
         * Прочить про интерполяцию строк можно здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings
         */
        listImage.setAttribute('style', "background-image:" + "url('" + this.link + "');");
        placeCardName.textContent = this.name;
        cardElement.appendChild(listImage);
        listImage.appendChild(placeCardDeleteBtn);
        cardElement.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeIcon);
        this.cardElement = cardElement;
        this.like();
        this.remove();
        return cardElement;
    }

     /** REVIEW: Можно лучше:
     * 
     * Вынести добавление обработчиков в отдельный метод, например addEventListeners, реализация будет выглядеть примерно так:
     * 
     * this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
     * this.cardElement.querySelector('...').addEventListener(...);
     * }
     * 
     * И вызывать этот метод перед возвращением элемента cardElement в методе create
     */
    like() {
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', function like(event) {
            event.target.classList.toggle('place-card__like-icon_liked');
        });

    }

    removeListeners() {
         this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
         this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        }

    remove() {
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', function deleted(event) {
            event.target.closest('.place-card').remove();
           
        });
        this.removeListeners();
    }
}
