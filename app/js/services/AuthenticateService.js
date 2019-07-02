import { HOST } from '../config/index';
export class AuthenticateService {
    authenticate(email, password) {
        fetch(`${HOST}users/authenticate`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => {
            const token = res.headers.get("Token");
            if (token != null) {
                localStorage.setItem('tkn', token);
            }
            return res.json();
        }).then(result => {
            console.log(result);
            localStorage.setItem('email', result[0]['email']);
            window.location.href = "home.html";
        });
    }
    resetPassword(email) {
        console.log(email);
        fetch(`${HOST}users/user/recover`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        })
            .then(res => res.json())
            .then(res => console.log(res));
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
