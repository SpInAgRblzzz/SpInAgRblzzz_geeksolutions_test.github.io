//функция валидации введенных данных
function isValid (username,password){
    let usernameValidation = true;
    let passwordValidation = true;
  
    if(username === ''){
      fillInputError(true,0,'Username required!');
      usernameValidation = false;
    } else if(keys.some((key)=>userlist[key].username === username)){
      fillInputError(true,0,'Username already exists!');
      usernameValidation = false;
    } else {
      fillInputError(false, 0, '');
    }
  
    if(password === ''){
      fillInputError(true,1,'Password required!');
      passwordValidation = false;
    } else {
      fillInputError(false, 1, '');
    }
  
    return usernameValidation && passwordValidation
  }



//функция заполнения полей ошибок
function fillInputError(errorMade, errorIndex, errorMessage){
  if(errorMade){
    errorAreas[errorIndex].innerHTML = `${errorMessage}`;
    inputs[errorIndex].classList.add('input-error');
    return
  }
  inputs[errorIndex].classList.remove('input-error');
  errorAreas[errorIndex].innerHTML = '';
}