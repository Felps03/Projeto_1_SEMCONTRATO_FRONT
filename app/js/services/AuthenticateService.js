import { HOST } from '../config/index';
export class AuthenticateService {
    authenticate(email, password) {
        const form = document.getElementById('login-form');
        let formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: `${HOST}users/authenticate`,
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
