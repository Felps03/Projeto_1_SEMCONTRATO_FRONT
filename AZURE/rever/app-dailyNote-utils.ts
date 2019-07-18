import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import { noFalse } from './utils/listCheck'

const yesterday = InputWrapper.fromId('first')
const today = InputWrapper.fromId('second')
const impediment = InputWrapper.fromId('third')

// automatically sets on input validation
const valFns = [
    validate(yesterday, val.yesterday),
    validate(today, val.today),
    validate(impediment, val.impediment),
]

// handle submit
const form: HTMLFormElement = <HTMLFormElement>document.getElementById('daily-form')
form.addEventListener('submit', (event: Event) => {
    event.preventDefault()

    if (noFalse(valFns)) {

        let formData = new FormData(form)

        fetch(`${HOST}dailys/daily`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                location.replace("app-daily-note.html")
            })
            .catch(console.log)
        }
})
