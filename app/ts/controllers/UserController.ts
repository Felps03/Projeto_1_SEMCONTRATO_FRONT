class UserController {
    
    private _name : HTMLInputElement; 
    private _lastName : HTMLInputElement; 
    private _userName : HTMLInputElement; 
    private _email : HTMLInputElement;
    private _password : HTMLInputElement;
    private _dateOfBirth : HTMLInputElement;

    constructor() {
        this._name = <HTMLInputElement>document.querySelector('#name');
    }


    adiciona(event: Event) {
        event.preventDefault();

        const user = new User(
         
        );

        console.log(user);
    }

}