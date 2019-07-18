export class Authenticate {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    get Email() {
        return this.email;
    }
    get Password() {
        return this.password;
    }
}
