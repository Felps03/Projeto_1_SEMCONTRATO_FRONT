import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import * as val from './validate-fns'
import { noFalse } from './utils/listCheck';

const emailInput = InputWrapper.fromId('email')
const passwordInput = InputWrapper.fromId('password')
const emailRecInput = InputWrapper.fromId('email_rec')

const valFns = [
    validate(emailInput, val.email),
    validate(passwordInput, val.password),
]

const valFnsRec = [
    validate(emailRecInput, val.email),
]

// handle submit
const form: HTMLFormElement = <HTMLFormElement>document.getElementById('login-form')
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
                location.replace("home.html")
            })
            .catch(console.log)

    }
})

// handle rec submit (email only)
const recForm: HTMLFormElement = <HTMLFormElement>document.getElementById('recovery-pass-form')
recForm.addEventListener('submit', (event: Event) => {
    event.preventDefault()

    if (noFalse(valFnsRec)) {

        let formData = new FormData(recForm)

        fetch(`${HOST}users/user/recover`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                location.replace("recovery.html")
            })
            .catch(console.log)

    }
})