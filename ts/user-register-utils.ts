import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import * as val from './validate-fns'
import { noFalse } from './utils/listCheck'

const dateInput = InputWrapper.fromId('birthdate')
const emailInput = InputWrapper.fromId('email')
const lastNameInput = InputWrapper.fromId('lastname')
const nameInput = InputWrapper.fromId('name')
const passwordInput = InputWrapper.fromId('password')
const passwordConfirmInput = InputWrapper.fromId('passwordConfirm')
const photoInput = InputWrapper.fromId('photo')
const usernameInput = InputWrapper.fromId('username')

// automatically sets oninput validation
const valFns = [
    validate(dateInput, val.date),
    validate(emailInput, val.email),
    validate(lastNameInput, val.lastName),
    validate(nameInput, val.name),
    validate(passwordInput, val.password),
    validate(passwordConfirmInput, val.passwordConfirm, passwordInput),
    validate(photoInput, val.photo),
    validate(usernameInput, val.username),
]

//File
const send = document.getElementById("file_send");
const customTxt = document.getElementById("custom-text");

send.addEventListener("click", function () {
    photoInput.el.click();
});

photoInput.el.addEventListener("change", function () {
    if (photoInput.value) {
        customTxt.innerHTML = photoInput.value.match(
            /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
    } else {
        customTxt.innerHTML = "Nenhuma imagem selecionada.";
    }
});

// handle submit
const form: HTMLFormElement = <HTMLFormElement>document.getElementById('user-register')
form.addEventListener('submit', (event: Event) => {
    event.preventDefault()

    if (noFalse(valFns)) {

        let formData = new FormData(form)
        
        fetch(`${HOST}users/user`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                location.replace("index.html")
            })
            .catch(console.log)

    }
})