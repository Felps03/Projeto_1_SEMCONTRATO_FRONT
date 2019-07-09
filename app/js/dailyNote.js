import { DailyNoteController } from "./controllers/DailyNoteController";
import { DailyNote } from "./models/index";
let yesterday = document.querySelector('#yesterday');
let today = document.querySelector('#today');
let impediment = document.querySelector('#impediment');
let date = document.querySelector('#date');
let dailyesResult = document.querySelector("#dayliesResult");
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
                const daily = new DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
                if (dailyesResult) {
                    const body = document.createElement('tr');
                    body.innerHTML =
                        `<tr>
                            <td>${r.owner}</td>
                            <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} ${daily.Date.getUTCHours()}:${daily.Date.getUTCMinutes()}</td>
                            <td>${daily.Yesterday}</td>
                            <td>${daily.Today}</td>
                            <td>${daily.Impediment}</td>
                        </tr>`;
                    dailyesResult.append(body);
                }
            });
        });
    }
}
