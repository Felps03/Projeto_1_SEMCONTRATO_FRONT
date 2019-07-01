export class AuthenticateController {
    constructor() {
        this.email = document.getElementById('#email');
        this.password = document.getElementById('#password');
    }
    authenticate(event) {
        event.preventDefault();
        alert("chegou");
        console.log('aqui');
        console.log(this.email);
        console.log(this.password);
    }
}
