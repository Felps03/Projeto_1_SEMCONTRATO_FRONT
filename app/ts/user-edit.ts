import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";


// let update = document.getElementById("user-edit");
// if (update) {
    //     const userController = new UserController();
    //     update.addEventListener('submit', userController.update.bind(userController))
    // }
    
    let name = <HTMLInputElement>document.querySelector('#name');
    let userName = <HTMLInputElement>document.querySelector('#userName');
    let lastName = <HTMLInputElement>document.querySelector('#lastName');
    let email = <HTMLInputElement>document.querySelector('#email');
    let dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
    let password = <HTMLInputElement>document.querySelector('#password');
    
    
    let userController = new UserController();

const data = userController.getUserData();


console.log(data)

if (data) {
    alert(data);
    data.then(data => {
        if (name != null) {
            name.value = data.name;
        }

        if (userName != null) {
            userName.value = data.userName;
        }

        if (lastName != null) {
            lastName.value = data.lastName;
        }

        if (email) {
            email.value = data.email;
        }

        if (dateOfBirth != null) {
            let dia = new Date(data.dateOfBirth).getDay();
            let mes = new Date(data.dateOfBirth).getMonth();
            let ano = new Date(data.dateOfBirth).getFullYear();

            let d;
            if (dia < 10) {
                d = "0" + dia.toString();
            }

            let m;
            if (mes < 10) {
                m = "0" + mes.toString();
            }

            let dataFormatada = ano + "-" + m + "-" + d;
            console.log(dataFormatada);

            dateOfBirth.value = dataFormatada;
        }
    })
}
else {
    window.location.href = "index.html"
}