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
        }
    }
    authenticate(event) {
        if (noFalse(this.authVals)) {
            const authenticateService = new AuthenticateService();
            console.log(this.email.value);
            authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
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
        authenticateService.logout();
    }
}
