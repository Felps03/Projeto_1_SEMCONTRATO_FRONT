import { HOST } from './config/index';

// handle submit
const form: HTMLFormElement = <HTMLFormElement>document.getElementById('daily-form')
form.addEventListener('submit', (event: Event) => {
    event.preventDefault()

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
})