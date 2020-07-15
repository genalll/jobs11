class FormValidator {
  constructor(form) {
    this.form = form;
  }


  isValidate = (input) => {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity('Это обязательное поле');
      return false
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('Должно быть от 2 до 30 символов');
      return false
    }
    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false
    }
    return input.checkValidity();
  };

  isFieldValid = (input) => {
    const errorElem = input.nextElementSibling;
    const valid = this.isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  };

  setSubmitButtonState = (button, state) => {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add(`popup__button_active`);
    } else {
      /** REVIEW: Можно лучше:
      *  
      * setAttribute вторым параметром принимает строку 
      * Для булевых атрибутов, вроде 'disabled', можно передать пустую строку для включения атрибута, а не повторять несколько
      * раз 'disabled', "disabled"
      **/ 
      button.setAttribute('disabled', "disabled");
      button.classList.remove(`popup__button_active`);
    }
  };

  handlerInputForm = (evt) => {
    const submit = evt.currentTarget.querySelector('.button');
    const [...inputs] = evt.currentTarget.elements;

    this.isFieldValid(evt.target);
    if (inputs.every(this.isValidate)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  };

  valid() {
    this.form.addEventListener('input', this.handlerInputForm, true);
  }

  reserError() {
    const myspan = this.form.querySelectorAll(".eror");
    myspan.forEach(element => {
        element.textContent = "";
    });
};

}