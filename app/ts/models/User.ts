export class User {
    private name: string;
    private lastName: string;
    private userName: string;
    private email: string;
    // private file_photo: string;
    private password: string;
    private dateOfBirth: string;
    // constructor( name: string, lastName: string, userName: string, email: string,  file_photo: string, password: string, dateOfBirth: string) {
    constructor( name: string, lastName: string, userName: string, email: string, password: string, dateOfBirth: string) {

        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        // this.file_photo = file_photo;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }
    
    get Name(){
        return this.name;
    }

    get LastName(){
        return this.lastName;
    }

    get UserName(){
        return this.userName;
    }
    get Email(){
        return this.email;
    }
    // get File_photo(){
    //     return this.file_photo;
    // }
    get Password(){
        return this.password;
    }
    get DateOfBirth(){
        return this.dateOfBirth;
    }
}