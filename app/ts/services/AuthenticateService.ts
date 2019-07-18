import { HOST } from '../config/index';

export class AuthenticateService {

    authenticate(email: string, password: string) {
        return fetch(`${HOST}users/authenticate`, {
            method: 'POST',
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
            localStorage.setItem('email', result[0]['email'])
            localStorage.setItem('id', result[0]['_id'])
            localStorage.setItem('isAdmin', result[0]['isAdmin'])
            window.location.href = "home.html";
        })
    }

    resetPassword(email: string) {
        return fetch(`${HOST}users/user/recover`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        })
    }

    verifyCode(emailCode: any, email: string, password: string) {
        return fetch(`${HOST}users/code/verify`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emailCode": emailCode,
                "email": email
            })
        }).catch(err => {
            console.log(err);
            return err;
        })
    }

    logout() {
        return fetch(`${HOST}users/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("tkn")}`
            },
        }).then(res => {
            if (res.status == 400) {
                alert("Houve um erro ao Deslogar");
            }
            if (res.status == 200) {
                localStorage.removeItem("tkn");
                localStorage.removeItem("email");
                localStorage.removeItem("id");
                window.location.href = 'index.html';
            }
        }).catch(error => {
            console.log("error: ", error);
            return error;
        });
    }

}