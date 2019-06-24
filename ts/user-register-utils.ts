import { validate, InputWrapper } from './validate/index'
import { HOST } from '../config/index'

const dateInput = InputWrapper.fromId('birthdate')
const emailInput = InputWrapper.fromId('email')
const lastNameInput = InputWrapper.fromId('lastname')
const nameInput = InputWrapper.fromId('name')
const passwordInput = InputWrapper.fromId('password')
const passwordConfirmInput = InputWrapper.fromId('passwordConfirm')
const photoInput = InputWrapper.fromId('photo')
const usernameInput = InputWrapper.fromId('username')

validate(dateInput, valDate)
validate(emailInput, valEmail)
validate(lastNameInput, valLastName)
validate(nameInput, valName)
validate(passwordInput, valPassword)
validate(passwordConfirmInput, valPasswordConfirm, passwordInput)
validate(photoInput, valPhoto)
validate(usernameInput, valUserName)

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

    let formData = new FormData(form)

    fetch('https://semcontrato.herokuapp.com/' + 'users/user', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            location.replace("index.html")
        })
        .catch(console.log)
})

// validation functions
function valDate(date: InputWrapper): string {
    const inputDate = new Date(date.value)

    const day = inputDate.getDate()
    const month = inputDate.getMonth()
    const year = inputDate.getFullYear()

    let isDate = true

    if (isNaN(day) || isNaN(month) || isNaN(year)) isDate = false
    if (month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11 && day + 1 > 30) isDate = false
    if ((year % 4) != 0 && month + 1 == 2 && day + 1 > 28) isDate = false
    if ((year % 4) == 0 && month + 1 == 2 && day + 1 > 29) isDate = false

    if (!isDate) {
        return 'Data inválida.'
    }

    if (inputDate > new Date()) {
        return 'Obrigatório já ter nascido.'
    }

    return null
}

function valEmail(email: InputWrapper): string {
    if (!email.value) {
        return 'Email vazio.'
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}?/.test(email.value)) {
        return 'Email inválido. Exemplo: abc123@def.gh'
    }
}

function valLastName(lastName: InputWrapper): string {
    if (!(lastName.value.length > 2)) {
        return 'Sobrenome muito curto.'
    } else if (!/[A-Z]([a-z]|\s)+$/.test(lastName.value)) {
        return 'Sobrenome inválido: Use uma letra maiúscula seguida de letras minúsculas.'
    } else if (/\s\s/.test(lastName.value)) {
        return 'Sobrenome inválido: Dois ou mais espaços consecutivos.'
    } else if (/\s[A-z]\s/.test(lastName.value)) {
        return 'Sobrenome inválido: Caracter solitário :(.'
    }

    return null
}

function valName(name: InputWrapper): string {
    if (!(name.value.length > 2)) {
        return 'Nome muito curto.'
    } else if (!/[A-Z]([a-z]|\s)+$/.test(name.value)) {
        return 'Nome inválido: Use uma letra maiúscula seguida de letras minúsculas.'
    } else if (/\s\s/.test(name.value)) {
        return 'Nome inválido: Dois ou mais espaços consecutivos.'
    } else if (/\s[A-z]\s/.test(name.value)) {
        return 'Nome inválido: Caracter solitário :(.'
    }

    return null
}

function valPassword(pw: InputWrapper): string {
    if (pw.value.length < 6 || pw.value.length > 8) {
        return 'Senha deve ter tamanho entre 6 e 8 dígitos.'
    } else if (pw.value.indexOf(' ') !== -1) {
        return 'Senha não pode conter espaços.'
    }

    return null
}

function valPasswordConfirm(pw: InputWrapper, confirm: InputWrapper): string {
    return pw.value !== confirm.value ? 'Senhas não batem' : null
}

const ALLOWED_EXTS = ['png', 'jpg', 'jpeg']
function valPhoto(file: InputWrapper): string {
    const fileExt = file.value.split('.').pop()

    if (ALLOWED_EXTS.indexOf(fileExt) !== -1) {
        return 'Formato de arquivo de imagem inválido.'
    } else {
        return null
    }
}

function valUserName(username: InputWrapper): string {
    if (!(username.value.length > 2)) {
        return 'Nome de usuário muito curto.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
        return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    }
}