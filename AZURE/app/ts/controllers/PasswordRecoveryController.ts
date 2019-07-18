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

            console.log('pimba');

            authenticateService.verifyCode(URL_KEY, this.email.value, this.password.value)
                .then(res => res.json())
                .then(res => {
                
                    let erro = res;
                
                    mesage.textContent = erro.erro;

                    if (erro.erro) document.getElementById("link-expired").style.display = "block";
                  
                }).catch(err => {
                    console.log(err) ;
                    mesage.textContent = JSON.stringify(err);
                });
        }

    }

}