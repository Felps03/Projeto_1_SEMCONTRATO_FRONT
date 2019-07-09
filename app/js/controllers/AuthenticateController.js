import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
import { UserService } from "../services/UserService";
export class AuthenticateController {
    constructor() {
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.emailRec = document.getElementById('email_rec');
        try {
            this.authVals = [
                validate(this.email, vals.email),
                validate(this.password, vals.password)
            ];
            this.passRecVals = [
                validate(this.emailRec, vals.email)
            ];
        }
        catch (e) {
            console.log("passo no catch");
        }
    }
    authenticate(event) {
        if (noFalse(this.authVals)) {
            const authenticateService = new AuthenticateService();
            console.log(this.email.value);
            authenticateService.authenticate(this.email.value.toString(), this.password.value.toString()).then(res => {
                const token = res.headers.get("Token");
                if (token != null) {
                    localStorage.setItem('tkn', token);
                }
                return res.json();
            }).then(result => {
                console.log(result);
                localStorage.setItem('email', result[0]['email']);
                localStorage.setItem('id', result[0]['_id']);
                window.location.href = "home.html";
            });
        }
        event.preventDefault();
    }
    resetPassword(event) {
        event.preventDefault();
        if (noFalse(this.passRecVals)) {
            const userService = new UserService();
            const authenticateService = new AuthenticateService();
            authenticateService.resetPassword(this.email.value.toString())
                .then(res => res.json())
                .then(res => {
                console.log(res);
                window.location.href = 'index.html';
            });
        }
    }
    logout(event) {
        event.preventDefault();
        const authenticateService = new AuthenticateService();
        authenticateService.logout().then(res => {
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
