import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import * as val from './validate-fns'

//TODO obter email do token para importar dados do usuário e preencher os campos

const emailInput = InputWrapper.fromId('email')

validate(emailInput, val.email)

const form: HTMLFormElement = <HTMLFormElement>document.getElementById('login-form')
form.addEventListener('submit', (event: Event) => {
    event.preventDefault()

    let formData = new FormData(form)

    fetch(`${HOST}users/authenticate`, {
        method: 'GET',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            location.replace("home.html")
        })
        .catch(console.log)
})