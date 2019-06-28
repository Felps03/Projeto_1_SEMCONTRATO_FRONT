import { UserController } from "./controllers/UserController";

const controller = new UserController();
<<<<<<< HEAD

let teste = document.querySelector('.form');
if(teste != null){
    teste.addEventListener('submit', controller.add.bind(controller));
}
=======
let teste = document.querySelector('.form');

if(teste != null){
    teste.addEventListener('submit', controller.add.bind(controller));
}
>>>>>>> b46c618c0e690e139dac1942e7b15ff9f1431b98
