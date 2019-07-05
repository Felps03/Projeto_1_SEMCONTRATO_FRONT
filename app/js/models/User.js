export class User {
    constructor(name, lastName, userName, email, password, dateOfBirth, id) {
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
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
    get Id() {
        return this.id;
    }
}
