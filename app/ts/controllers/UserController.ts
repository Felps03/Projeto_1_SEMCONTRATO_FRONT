import { User } from '../models/User';
import { UserService } from "../services/UserService";
import { AuthenticateService } from '../services/index';

import { validate, clean } from '../helpers/index'

import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'
import { MessageView } from '../views/MessageView';

export class UserController {

    private messageView: MessageView

    private name: HTMLInputElement;
    private lastName: HTMLInputElement;
    private userName: HTMLInputElement;
    private email: HTMLInputElement;
    //private photo: HTMLInputElement;
    private password: HTMLInputElement;
    private dateOfBirth: HTMLInputElement;
    private passwordConfirm: HTMLInputElement;
    private id: HTMLInputElement;

    private recaptchaChange: HTMLInputElement;

    private addVals: (() => boolean)[];

    constructor() {
        this.name = <HTMLInputElement>document.querySelector('#name');
        this.lastName = <HTMLInputElement>document.querySelector('#lastName');
        this.userName = <HTMLInputElement>document.querySelector('#userName');
        this.email = <HTMLInputElement>document.querySelector('#email');
        // this.photo = <HTMLInputElement>document.querySelector('#photo');
        this.password = <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
        this.passwordConfirm = <HTMLInputElement>document.querySelector('#passwordConfirm');
        this.id = <HTMLInputElement>document.querySelector('#id');


        this.recaptchaChange = <HTMLInputElement>document.querySelector('#recaptchaChange');

        this.messageView = new MessageView('#message-view')

        // init validations

        this.addVals = [
            validate(this.name, vals.name),
            validate(this.lastName, vals.lastName),
            validate(this.userName, vals.username),
            validate(this.email, vals.email),
            // validate(this.photo, vals.photo),
            validate(this.password, vals.editPassword),
            validate(this.dateOfBirth, vals.dateOfBirth),
            validate(this.passwordConfirm, vals.editPasswordConfirm, this.password)
        ];
    }

    add(event: Event) {
        event.preventDefault();

        if (noFalse(this.addVals)) {

            const user = new User(
                this.name.value.toString(),
                this.lastName.value.toString(),
                this.userName.value.toString(),
                this.email.value.toString(),
                // this.photo.value.toString(),
                this.dateOfBirth.value.toString(),
                this.password.value.toString(),
            );

            const userService = new UserService();

            new Promise((resolve, reject) => {
                userService.add(user)
                    .then(result => {
                        if (result.status === 200) {
                            const token = result.headers.get("Token");
                            if (token != null) {
                                localStorage.setItem('tkn', token);
                            };
                            resolve(result.json())
                        } else {
                            reject(result)
                        }
                    })
            }).then((res: any) => {
                localStorage.setItem('email', res.email)
                localStorage.setItem('id', res._id)
                window.location.href = "index.html";
            })
                .catch((res: any) => res.json())
                .then((res: any) => {
                    document.getElementById('message-view').innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">Marque a caixa de dialogo do reCAPTCHA!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `;
                    if (res.erro)
                        this.messageView.update(res.erro)
                })
        };
    }

    getUserData() {
        if (!localStorage.getItem('tkn')) {
            return false;
        }
        else {
            const userService = new UserService();
            return userService.getData()
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    if (!result) {
                        window.location.href = "index.html"
                    }

                    let id = <HTMLInputElement>document.querySelector('#id');
                    if (id != null) id.value = result['_id'];

                    new User(
                        this.name.value = result['name'],
                        this.userName.value = result['userName'],
                        this.lastName.value = result['lastName'],
                        this.email.value = result['email'],
                        this.dateOfBirth.value = result['dateOfBirth'].slice(0, 10),
                        this.password.value = ""
                    );
                });
        }
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#id');

        if (noFalse(this.addVals)) {
            let dataOfBirth = this.dateOfBirth.value.replace(/-/g, ',');
            let recaptchaON = false;

            const user = new User(
                this.name.value.toString(),
                this.lastName.value.toString(),
                this.userName.value.toString(),
                this.email.value.toString(),
                dataOfBirth,
                this.password.value.toString()
            );

            if ($('#recaptchaChange').prop("checked")) recaptchaON = true;

            const userService = new UserService();

            let msg = document.getElementById('retrieve-msg')

            userService.update(user, id.value, recaptchaON)
                .then(result => {
                    if (result.status == 201) {

                        document.querySelector('#nameSpan').textContent = this.name.value;
                        document.querySelector('#userNameSpan').textContent = `(${this.userName.value})`;

                        msg.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show msg-status" role="alert">
                            <strong>Dados atualizados com sucesso!</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                    } else if (result.status >= 300) {
                        msg.innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show msg-status" role="alert">
                                <strong>Erro ao atualizar os dados.</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `;
                    }
                    return result.json();
                }).then(() => {
                    setTimeout(() => {
                        msg.innerHTML = "";
                    }, 3000);
                });
        }
    }

    disablePasswordInput(event: Event) {
        event.preventDefault();

        let checkbox = <HTMLInputElement>document.querySelector('#passwordChange');
        let password = <HTMLInputElement>document.querySelector('#password');
        let passwordConfirm = <HTMLInputElement>document.querySelector('#passwordConfirm');

        if (checkbox.checked) {
            password.removeAttribute('disabled');
            passwordConfirm.removeAttribute('disabled');
        } else {

            clean(password);
            clean(passwordConfirm);

            password.setAttribute('disabled', 'true');
            passwordConfirm.setAttribute('disabled', 'true');
        }
    }
}