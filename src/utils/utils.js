

// очищение поля ошибок, в случае закрытия окна
export function setInputsErrorClear(form, popupCharObj ){
  Array.from(form.querySelectorAll(popupCharObj .inputErrorSelector)).forEach(element =>{
    element.classList.add(popupCharObj.errorClass);
  });
};
