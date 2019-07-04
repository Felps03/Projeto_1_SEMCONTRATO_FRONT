import { DailyNoteController } from "./controllers/DailyNoteController";

const controller = new DailyNoteController();

let cadastrar = document.querySelector("#daily-form");
if(cadastrar) {
    cadastrar.addEventListener('submit', controller.add.bind(controller));
}

let listDate = document.querySelector("#daily-form");
if(listDate) {
    listDate.addEventListener('click', controller.listD.bind(controller));
}