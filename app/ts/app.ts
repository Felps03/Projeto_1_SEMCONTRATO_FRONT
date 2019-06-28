import { UserController } from "./controllers/UserController";

const controller = new UserController();
let teste = document.querySelector('.form');

if(teste != null){
    teste.addEventListener('submit', controller.add.bind(controller));
}
