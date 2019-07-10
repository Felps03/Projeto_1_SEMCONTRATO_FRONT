import { User } from '../models/User';
import { UserService } from "../services/UserService";
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
        this.id = document.querySelector('#id');
        this.addVals = [
            validate(this.name, vals.name),
            validate(this.lastName, vals.lastName),
            validate(this.userName, vals.username),
            validate(this.email, vals.email),
            validate(this.password, vals.password),
            validate(this.dateOfBirth, vals.dateOfBirth),
            validate(this.passwordConfirm, vals.passwordConfirm, this.password)
        ];
    }
    add(event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {
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
                localStorage.setItem('email', res.email);
                localStorage.setItem('id', res._id);
                window.location.href = "home.html";
            });
        }
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
                    window.location.href = "index.html";
                }
                let id = document.querySelector('#id');
                if (id != null)
                    id.value = result['_id'];
                new User(this.name.value = result['name'], this.userName.value = result['userName'], this.lastName.value = result['lastName'], this.email.value = result['email'], this.dateOfBirth.value = result['dateOfBirth'].slice(0, 10), this.password.value = "");
            });
        }
    }
    update(event) {
        event.preventDefault();
        let id = document.querySelector('#id');
        if (noFalse(this.addVals)) {
            let dataOfBirth = this.dateOfBirth.value.replace(/-/g, ',');
            const user = new User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.password.value.toString(), dataOfBirth);
            const userService = new UserService();
            userService.update(user, id.value)
                .then(result => {
                return result.json();
            }).then(res => {
                window.location.href = "home.html";
            });
        }
    }
}
