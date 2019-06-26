class UserController {
    
    private _name : HTMLInputElement; 
    private _lastName : HTMLInputElement; 
    private _userName : HTMLInputElement; 
    private _email : HTMLInputElement;
    private _password : HTMLInputElement;
    private _dateOfBirth : HTMLInputElement;

    constructor() {
        this._name = <HTMLInputElement>document.querySelector('#name');
        this._lastName = <HTMLInputElement>document.querySelector('#lastName');
        this._userName = <HTMLInputElement>document.querySelector('#userName');
        this._email = <HTMLInputElement>document.querySelector('#email');
        this._password = <HTMLInputElement>document.querySelector('#password');
        this._dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
    }


    adiciona(event: Event) {
        event.preventDefault();

        const user = new User(
            this._name.value,
            this._lastName.value,
            this._userName.value,
            this._email,
            this._password.value,
            new Date(this._dateOfBirth.value)
        );

        console.log(user);
    }

}