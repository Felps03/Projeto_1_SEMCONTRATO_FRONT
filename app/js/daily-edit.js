const url = new URLSearchParams(location.search);
const url_owner = url.get('owner');
const url_daily = url.get('id');
import { EditDailyController } from "./controllers/EditDailyController";
const idResult = document.querySelector('#editResult');
if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {
    let update = document.getElementById('editdaily-form');
    if (update) {
        const editController = new EditDailyController();
        update.addEventListener("submit", (e) => {
            editController.update(e)
                .then((res) => {
                if (res.status === 200) {
                    idResult.textContent = "Daily Editada com sucesso";
                    idResult.className = "alert alert-info";
                }
            });
        });
    }
    const editDailyController = new EditDailyController().getDailyData(url_daily);
}
else {
    window.location.href = "index.html";
}
