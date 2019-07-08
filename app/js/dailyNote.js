import { DailyNoteController } from "./controllers/DailyNoteController";
let yesterday = document.querySelector('#yesterday');
let today = document.querySelector('#today');
let impediment = document.querySelector('#impediment');
let date = document.querySelector('#date');
const controller = new DailyNoteController();
let cadastrar = document.querySelector("#daily-form");
if (cadastrar) {
    cadastrar.addEventListener('submit', controller.add.bind(controller));
}
let listDate = document.querySelector("#filter");
if (listDate) {
    listDate.addEventListener('click', listDateDaily);
}
function listDateDaily(event) {
    const result = controller.listD(event);
    if (result) {
        result
            .then(result => {
            result.forEach((r) => {
                console.log(r);
            });
        });
    }
}
