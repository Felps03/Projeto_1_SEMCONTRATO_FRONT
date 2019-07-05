import { DailyNoteController } from "./controllers/DailyNoteController";
let yesterday = document.querySelector('#yesterday');
let today = document.querySelector('#today');
let impediment = document.querySelector('#impediment');
let date = document.querySelector('#date');
let nameSpanTxt = "";
let userNameSpanTxt = "";
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
    const daily = controller.listD(event);
    if (daily) {
        daily
            .then(daily => {
            console.log();
            if (yesterday != null) {
                yesterday.textContent = daily.yesterday;
            }
        });
    }
}
