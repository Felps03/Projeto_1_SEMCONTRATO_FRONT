import { User } from '../models/User';
import { domInject } from '../helpers/decorators/index';
import { name, lastName, username, email, photo, password, passwordConfirm, code, date } from '../validate/userValidate';

export class UserController {

    @domInject('#name')
    private _name: JQuery;

    @domInject('#lastName')
    private _lastName: JQuery;

    @domInject('#userName')
    private _userName: JQuery;

    @domInject('#email')
    private _email: JQuery;

    @domInject('#password')
    private _password: JQuery;

    @domInject('#dateOfBirth')
    private _dateOfBirth: JQuery;

    constructor() {}


    add(event: Event) {
        event.preventDefault();

        let data = new Date(this._dateOfBirth.val().replace(/-/g, ','));

        const user = new User(
            this._name.toString(),
            this._lastName.toString(),
            this._userName.toString(),
            this._email.toString(),
            this._password.toString(),
            data
        );

        console.log(user);
    }

    list() {

    }

    update() {

    }

    remove() {

    }

    findById() {

    }

    changePassword() {

    }
}