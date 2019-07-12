import { AuthenticateService, UserService } from "../services/index";
import { MessageView } from '../views/MessageView';
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
export class AuthenticateController {
    constructor() {
        this.messageView = new MessageView('#message-view');
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
            authenticateService.authenticate(this.email.value, this.password.value)
                .catch(res => res.json())
                .then((res) => {
                if (res.erro)
                    this.messageView.update(res.erro);
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
        authenticateService.logout();
    }
}
