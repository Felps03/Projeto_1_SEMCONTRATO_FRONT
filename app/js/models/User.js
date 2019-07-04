export class User {
    constructor(name, lastName, userName, email, file_photo, password, dateOfBirth) {
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.file_photo = file_photo;
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
    get File_photo() {
        return this.file_photo;
    }
    get Password() {
        return this.password;
    }
    get DateOfBirth() {
        return this.dateOfBirth;
    }
}
