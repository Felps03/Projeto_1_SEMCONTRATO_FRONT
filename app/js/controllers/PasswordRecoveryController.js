import { AuthenticateService } from '../services/index';
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
export class PasswordRecoveryController {
    constructor() {
        this.email = document.querySelector('#email_rec');
        this.password = document.querySelector('#password_rec');
        this.passwordConfirm = document.querySelector('#password_rec_conf');
        this.changePasswordVals = [
            validate(this.email, vals.email),
            validate(this.password, vals.password),
            validate(this.passwordConfirm, vals.passwordConfirm, this.password)
        ];
    }
    changePassword(event) {
        event.preventDefault();
        if (noFalse(this.changePasswordVals)) {
            let url_string = window.location.href;
            let url = new URL(url_string);
            let URL_KEY = url.searchParams.get("key");
            const authenticateService = new AuthenticateService();
            console.log('pimba');
            authenticateService.verifyCode(URL_KEY, this.email.value, this.password.value);
        }
    }
}
