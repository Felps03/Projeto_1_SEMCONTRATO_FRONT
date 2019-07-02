import { HOST } from '../config/index';
import { UserService } from './UserService';
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
            .then(res => {
            console.log(res);
            window.location.href = 'index.html';
        });
    }
    verifyCode(emailCode, email, password) {
        fetch(`${HOST}users/code/verify`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emailCode": emailCode,
                "email": email
            })
        }).then(res => {
            if (res.status == 400) {
                alert('Codigo invalido');
            }
            if (res.status == 200) {
                const userService = new UserService();
                userService.changePassword(email, password);
            }
        })
            .catch(error => {
            console.log("error: ", error);
            return error;
        });
    }
}
