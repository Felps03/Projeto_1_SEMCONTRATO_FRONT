import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
import { UserService } from "../services/UserService";

export class AuthenticateController {
    constructor() {
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');

        try {
            this.emailRec = document.getElementById('email_rec');
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
            let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        }
        event.preventDefault();
    }
    resetPassword(event) {
        event.preventDefault();
        if (noFalse(this.passRecVals)) {
            const userService = new UserService();
            const authenticateService = new AuthenticateService();
            authenticateService.resetPassword(this.email.value.toString());
        }
    }
    logout(event) {
        event.preventDefault();
        const authenticateService = new AuthenticateService();
        authenticateService.logout();
    }
}
