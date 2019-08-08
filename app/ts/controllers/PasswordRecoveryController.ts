import { User } from '../models/User';
import { UserService } from "../services/UserService";
import { AuthenticateService } from '../services/index';


import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'


export class PasswordRecoveryController {

    private email: HTMLInputElement;
    private password: HTMLInputElement;
    private passwordConfirm: HTMLInputElement;

    private changePasswordVals: (() => boolean)[];

    constructor() {
        this.email = <HTMLInputElement>document.querySelector('#email_rec');
        this.password = <HTMLInputElement>document.querySelector('#password_rec');
        this.passwordConfirm = <HTMLInputElement>document.querySelector('#password_rec_conf');

        // init validations


        this.changePasswordVals = [
            validate(this.email, vals.email),
            validate(this.password, vals.password),
            validate(this.passwordConfirm, vals.passwordConfirm, this.password)
        ];

    }

    changePassword(event: Event) {
        event.preventDefault();

        let mesage = document.querySelector("#link-expired");

        if (noFalse(this.changePasswordVals)) {

            let url_string = window.location.href;
            let url = new URL(url_string);
            let URL_KEY = url.searchParams.get("key");

            const authenticateService = new AuthenticateService();
            const userService = new UserService();

            authenticateService.verifyCode(URL_KEY, this.email.value, this.password.value)
                .then(res => {

                    if (res.status === 200) {
                        const userService = new UserService();
                        console.log(this.email.value)
                        console.log(this.password.value)
                        userService.changePassword(this.email.value, this.password.value)
                            .then(res => {

                                console.log(res)
                                console.log(res.status === 200)

                                if (res.status === 200) {

                                    document.getElementById("link-expired").style.display = "block";
                                    mesage.textContent = "Senha alterada com sucesso";
                                }
                            })
                    }
                    else {
                        console.log(res.status)
                        mesage.textContent = "Código Inválido";
                        document.getElementById("link-expired").style.display = "block";

                    }
                })

        }

    }

}