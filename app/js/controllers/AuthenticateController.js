import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
import { UserService } from "../services/UserService";
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
        event.preventDefault();
        console.log(this.authVals);
        if (noFalse(this.authVals)) {
            const authenticateService = new AuthenticateService();
            let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
            console.log(usuario);
        }
    }
    changePassword(event) {
        event.preventDefault();
        var email = document.querySelector('#email_rec');
        const userService = new UserService();
        const authenticateService = new AuthenticateService();
        userService.findByEmail(email.value);
        authenticateService.resetPassword(email.value);
    }
}
