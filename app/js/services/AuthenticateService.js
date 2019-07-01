import { HOST } from '../config/index';
export class AuthenticateService {
    authenticate(email, password) {
        fetch(`${HOST}users/authenticate`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => res.json())
            .then(res => console.log(res));
    }
    resetPassword(email) {
        const form = document.getElementById('recovery-pass-form');
        let formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: `${HOST}users/user/recover`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    verifyCode(codigo, email) {
        const form = document.getElementById('recovery-code-form');
        let formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: `${HOST}users/code/verify`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
}
