import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'
import { UserService } from "../services/UserService";

export class AuthenticateController {

    private email: HTMLInputElement;
    private password: HTMLInputElement;

    private emailRec: HTMLInputElement;

    private authVals: (() => boolean)[];
    private passRecVals: (() => boolean)[];

    constructor() {
        this.email = <HTMLInputElement>document.getElementById('email');
        this.password = <HTMLInputElement>document.getElementById('password');

        this.emailRec = <HTMLInputElement>document.getElementById('email_rec');

        // init validations
        try {
            this.authVals = [
                validate(this.email, vals.email),
                validate(this.password, vals.password)
            ];

            this.passRecVals = [
                validate(this.emailRec, vals.email)
            ];
        } catch (e) {
            // console.log("passo no catch");
        }
    }

    authenticate(event: Event) {

        if (noFalse(this.authVals)) {

            const authenticateService = new AuthenticateService();

            console.log(this.email.value);

            authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        }

        event.preventDefault();
    }

    resetPassword(event: Event) {
        event.preventDefault();

        if (noFalse(this.passRecVals)) {
            // /users/user/recover
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

    logout(event: Event) {
        event.preventDefault();
        const authenticateService = new AuthenticateService();

        authenticateService.logout().then(res => {
            if (res.status == 400) {
                alert("Houve um erro ao Deslogar");
            }
            if (res.status == 200) {
                localStorage.removeItem("tkn");
                localStorage.removeItem("email");
                localStorage.removeItem("isAdmin");
                localStorage.removeItem("id");
                window.location.href = 'index.html';
            }
        }).catch(error => {
            console.log("error: ", error);
            return error;
        });

    }
}