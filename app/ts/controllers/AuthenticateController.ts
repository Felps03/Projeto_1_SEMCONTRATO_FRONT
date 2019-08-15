import { Authenticate } from "../models/index";
import { AuthenticateService, UserService, ConfigurationService } from "../services/index";
import { MessageView } from '../views/MessageView'

import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
import { getCaptchaConfig } from '../utils/getConfig';

declare const grecaptcha: any

export class AuthenticateController {

    private messageView: MessageView

    private email: HTMLInputElement;
    private password: HTMLInputElement;

    private emailRec: HTMLInputElement;

    private authVals: (() => boolean)[];
    private passRecVals: (() => boolean)[];

    constructor() {
        try {
            this.messageView = new MessageView('#message-view')
        } catch { }

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
            const configurationService = new ConfigurationService();

            authenticateService.authenticate(this.email.value, this.password.value)
                .then((res: any) => {
                    if (res.status === 400) {

                        grecaptcha.reset();

                        document.getElementById('message-view').innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">Email ou senha inválidos.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `;
                    }
                })
                .catch(err => {
                    console.log(err);

                    grecaptcha.reset();

                    document.getElementById('message-view').innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">Marque a caixa de dialogo do reCAPTCHA!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                })
        }

        event.preventDefault();
    }

resetPassword(event: Event) {
    event.preventDefault();

    if (noFalse(this.passRecVals)) {
        // /users/user/recover
        const userService = new UserService();
        const authenticateService = new AuthenticateService();

        authenticateService.resetPassword(this.emailRec.value.toString())
            .then(res => {
                if (Math.floor(res.status / 100) === 2) {
                    res.json()
                        .then(() => {
                            document.getElementById('recoveryModal-close').click();
                            this.messageView.update('Foi enviado um email para você, siga as instruções contidas nele para continuar.<br>Por favor verificar a seção de <i>spam</i>.');
                        })
                        .catch(error => {
                            console.error(error);
                        })
                } else {
                    res.json()
                        .then((erres) => {
                            this.messageView.update(erres.erro);
                        })
                }
            });
    }
}

logout(event: Event) {
    event.preventDefault();

    localStorage.clear();
    window.location.href = 'index.html';
}

checkAdmin() {
    event.preventDefault();

    const authenticateService = new AuthenticateService();
    return authenticateService.verifyAdmin();

}

    // logout(event: Event) {
    //     event.preventDefault();

    //     console.log("chegou no controller");

    //     const authenticateService = new AuthenticateService();

    //     authenticateService.logout().then(res => {
    //         if (res.status == 400) {
    //             alert("Houve um erro ao Deslogar");
    //         }
    //         if (res.status == 200) {
    //             localStorage.removeItem("tkn");
    //             localStorage.removeItem("email");
    //             localStorage.removeItem("isAdmin");
    //             localStorage.removeItem("id");
    //             window.location.href = 'index.html';
    //         }
    //     }).catch(error => {
    //         console.log("error: ", error);
    //         return error;
    //     });

    // }

}