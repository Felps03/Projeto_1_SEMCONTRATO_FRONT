export class User {
    constructor(name, lastName, userName, email, password, dateOfBirth) {
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }
    get Name() {
        return this.name;
    }
    get LastName() {
        return this.lastName;
    }
    get UserName() {
        return this.userName;
    }
    get Email() {
        return this.email;
    }
    get Password() {
        return this.password;
    }
    get DateOfBirth() {
        return this.dateOfBirth;
    }
}
