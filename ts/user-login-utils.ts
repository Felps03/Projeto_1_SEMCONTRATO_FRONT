import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import * as val from './validate-fns'

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

    let isValid = true

    valFns.forEach((valFn) => {
        if (!valFn())
            isValid = false
    })

    if (isValid) {

        let formData = new FormData(form)
        console.log(formData)

        fetch(HOST + 'users/authenticate', {
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