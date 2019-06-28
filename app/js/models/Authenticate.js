export class Authenticate {
    constructor(email, password) {
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
