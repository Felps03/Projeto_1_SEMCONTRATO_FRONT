System.register(["./controllers/EditAskController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var EditAskController_1, userData_1, url, url_ask_id, url_owner, idResult, userData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EditAskController_1_1) {
                EditAskController_1 = EditAskController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            url = new URLSearchParams(location.search);
            url_ask_id = url.get('id');
            url_owner = url.get('owner');
            idResult = document.querySelector('#editResult');
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            $('#ask_cancel').click((e) => {
                e.preventDefault();
                window.location.href = "app-daily-note.html";
            });
            if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {
                let update = document.getElementById('editask-form');
                if (update) {
                    const editController = new EditAskController_1.EditAskController();
                    editController.getAskData(url_ask_id);
                    update.addEventListener("submit", (e) => {
                        editController.update(e)
                            .then((res) => {
                            if (res.status === 200) {
                                idResult.textContent = "Resposta Editada com sucesso";
                                idResult.className = "alert alert-info";
                                setTimeout(() => {
                                    window.location.href = `app-help-center.html`;
                                }, 1000);
                            }
                        });
                    });
                }
            }
            else {
                window.location.href = "index.html";
            }
        }
    };
});
