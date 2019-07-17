const url = new URLSearchParams(location.search);
const url_owner = url.get('owner');
const url_daily = url.get('id');

import { EditDailyController } from "./controllers/EditDailyController";
import { getUser } from "./utils/userData";
// import { DailyNote } from "./models/index";

// const update = document.querySelector('#update_daily');

// const idDaily = document.querySelector('#idDaily')
// const yesterday = document.querySelector('#edit-yesterday')
// const today = document.querySelector('#edit-today')
// const impediment = document.querySelector('#edit-impediment')
const idResult = document.querySelector('#editResult')
let userData = getUser();
// let newYesterday: string;
// let newToday: string;
// let newImpediment: string;


if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {

    let update = document.getElementById('editdaily-form');

    if (update) {
        const editController = new EditDailyController();
        // update.addEventListener("submit", editController.update.bind(editController)
        update.addEventListener("submit", (e: Event) => {
            editController.update(e)
                .then((res: (any)) => {
                    if (res.status === 200) {
                        idResult.textContent = "Daily Editada com sucesso"
                        idResult.className = "alert alert-info"
                    }
                })
        })
    }
    // console.log(url_daily)
    const editDailyController = new EditDailyController().getDailyData(url_daily);

}
else {
    window.location.href = "index.html"

}