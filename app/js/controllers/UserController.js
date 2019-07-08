import { User } from '../models/User';
import { UserService } from "../services/UserService";
<<<<<<< HEAD
=======
import { AuthenticateService } from '../services/index';
>>>>>>> bfc2b37b5e159f7b394e718ca9a20cdeb7aac934
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
export class UserController {
    constructor() {
        this.name = document.querySelector('#name');
        this.lastName = document.querySelector('#lastName');
        this.userName = document.querySelector('#userName');
        this.email = document.querySelector('#email');
        this.password = document.querySelector('#password');
        this.dateOfBirth = document.querySelector('#dateOfBirth');
        this.passwordConfirm = document.querySelector('#passwordConfirm');
        this.addVals = [
            validate(this.name, vals.name),
            validate(this.lastName, vals.lastName),
            validate(this.userName, vals.username),
            validate(this.email, vals.email),
<<<<<<< HEAD
=======
            validate(this.photo, vals.photo),
>>>>>>> bfc2b37b5e159f7b394e718ca9a20cdeb7aac934
            validate(this.password, vals.password),
            validate(this.dateOfBirth, vals.dateOfBirth),
            validate(this.passwordConfirm, vals.passwordConfirm, this.password)
        ];
    }
    add(event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {
<<<<<<< HEAD
            const user = new User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.password.value.toString(), this.dateOfBirth.value.toString());
            const userService = new UserService();
            userService.add(user)
                .then(result => {
                const token = result.headers.get("Token");
                if (token != null) {
                    localStorage.setItem('tkn', token);
                }
                ;
                return result.json();
            })
                .then(res => {
                console.table(res);
                localStorage.setItem('email', res.email);
                localStorage.setItem('id', res._id);
                window.location.href = "home.html";
            });
        }
=======
            let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));
            const user = new User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.photo.value.toString(), this.password.value.toString(), dataOfBirth);
            const userService = new UserService();
            let usuario = userService.cadastro(user);
            console.log(user);
            console.log(usuario);
        }
    }
    changePassword(event) {
        event.preventDefault();
        let email = document.querySelector('#email_rec');
        let password = document.querySelector('#password_rec');
        let url_string = window.location.href;
        let url = new URL(url_string);
        let URL_KEY = url.searchParams.get("key");
        const authenticateService = new AuthenticateService();
        authenticateService.verifyCode(URL_KEY, email.value, password.value);
>>>>>>> bfc2b37b5e159f7b394e718ca9a20cdeb7aac934
    }
}
