import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import * as val from './validate-fns'
import { noFalse } from './utils/check';

const emailInput = InputWrapper.fromId('email')
const passwordInput = InputWrapper.fromId('password')

const valFns = [
    validate(emailInput, val.email),
    validate(passwordInput, val.password)
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