import { validate, InputWrapper } from './validate/index'
import { HOST } from './config/index'
import * as val from './validate-fns'
import { noFalse } from './utils/listCheck';

declare const grecaptcha: any;

const codeInput = InputWrapper.fromId('code')
const emailInput = InputWrapper.fromId('email_rec')
const passwordInput = InputWrapper.fromId('password_rec')
const passwordConfirmInput = InputWrapper.fromId('password_rec_conf')

const valFns = [
    validate(codeInput, val.code),
    validate(emailInput, val.email),
    validate(passwordInput, val.password),
    validate(passwordConfirmInput, val.passwordConfirm, passwordInput),
]

// handle submit
const form: HTMLFormElement = <HTMLFormElement>document.getElementById('recovery-code-form')
form.addEventListener('submit', (event: Event) => {
    event.preventDefault()

    if (noFalse(valFns)) {

        grecaptcha.ready(function () {

            grecaptcha.execute('6LemuakUAAAAALHHE5_7NL8FwKzEvCXLXzUUqahn', { action: 'user_register' })
                .then(function (token: string) {

                    let formData = new FormData(form)
                    formData.append('recaptchaToken', token)

                    fetch(`${HOST}users/code/verify`, {
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
        })

        /*
            $.ajax({
            type: "POST",
            url: `${HOST}users/code/verify`,
            data: {
                "email": email,
                "emailCode": code,
                "senha": senha
            },
            success: function (data) {
                alert("Senha trocada com sucesso");
                //qual local ir?
                window.location.href = "index.html";
            },
            error: function (request, status, error) {
                console.log(error);
                alert(request.responseText);
                alert(erro);
            }
        });*/

    }
})