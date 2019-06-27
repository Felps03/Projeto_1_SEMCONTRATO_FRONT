import { User } from '../models/User';
import { domInject } from '../helpers/decorators/index';

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


    adiciona(event: Event) {
        event.preventDefault();

        let data = new Date(this._date.val().replace(/-/g, ','));

        const user = new User(
            this._name,
            this._lastName,
            this._userName,
            this._email,
            this._password,
            data
        );

        console.log(user);
    }

}