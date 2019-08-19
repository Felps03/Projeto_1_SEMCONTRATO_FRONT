System.register(["./controllers/EditDailyController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var url, url_owner, url_daily, EditDailyController_1, userData_1, idResult, userData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EditDailyController_1_1) {
                EditDailyController_1 = EditDailyController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            url = new URLSearchParams(location.search);
            url_owner = url.get('owner');
            url_daily = url.get('id');
            idResult = document.querySelector('#editResult');
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            $('#daily_cancel').click((e) => {
                e.preventDefault();
                window.location.href = "app-daily-note.html";
            });
            if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {
                let update = document.getElementById('editdaily-form');
                if (update) {
                    const editController = new EditDailyController_1.EditDailyController();
                    update.addEventListener("submit", (e) => {
                        editController.update(e)
                            .then((res) => {
                            if (res.status === 200) {
                                idResult.textContent = "Daily Editada com sucesso";
                                idResult.className = "alert alert-info";
                                setTimeout(() => {
                                    window.location.href = "app-daily-note.html";
                                }, 1000);
                            }
                        });
                    });
                }
                const editDailyController = new EditDailyController_1.EditDailyController().getDailyData(url_daily);
            }
            else {
                window.location.href = "index.html";
            }
            if (window.innerWidth <= 576) {
                document.getElementById('access').classList.add('btn-block');
            }
        }
    };
});
