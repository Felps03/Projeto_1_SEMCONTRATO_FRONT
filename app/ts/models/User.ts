class User {

    private _name; 
    private _lastName; 
    private _userName; 
    private _email;
    private _password;
    private _dateOfBirth;

    constructor(name, lastName, userName, email, password, dateOfBirth) {
        this._name = name;
        this._lastName = lastName;
        this._userName = userName;
        this._email = email;
        this._password = password;
        this._dateOfBirth = dateOfBirth;
    }

    get name() {
        return this._name;
    }

    get lastName(){
        return this._lastName;
    }
    
    get userName() {
        return this._userName
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }
}