import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
export class AuthenticateController {
    constructor() {
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.authVals = [
            validate(this.email, vals.email),
            validate(this.password, vals.password)
        ];
    }
    authenticate(event) {
        const authenticateService = new AuthenticateService();
        let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        event.preventDefault();
    }
    resetPassword(event) {
        event.preventDefault();
        var email = document.querySelector('#email_rec');
        const authenticateService = new AuthenticateService();
        authenticateService.resetPassword(email.value.toString());
    }
    logout(event) {
        event.preventDefault();
        const authenticateService = new AuthenticateService();
        authenticateService.logout();
    }
}
