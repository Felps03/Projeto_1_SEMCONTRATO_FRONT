export class Authenticate {

    private _email: string;
    private _password: string;

    constructor( email: string,  password: string) {

        this._email = email;
        this._password = password;

    }
   
    get password() {

        return this._password;

    }

    get email() {

        return this._email;

    }

}