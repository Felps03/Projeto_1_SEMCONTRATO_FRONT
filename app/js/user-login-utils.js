System.register(["./validate/index", "./config/index", "./validate-fns", "./utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, val, listCheck_1, emailInput, passwordInput, emailRecInput, valFns, valFnsRec, form, recForm;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (val_1) {
                val = val_1;
            },
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            }
        ],
        execute: function () {
            emailInput = index_1.InputWrapper.fromId('email');
            passwordInput = index_1.InputWrapper.fromId('password');
            emailRecInput = index_1.InputWrapper.fromId('email_rec');
            valFns = [
                index_1.validate(emailInput, val.email),
                index_1.validate(passwordInput, val.password),
            ];
            valFnsRec = [
                index_1.validate(emailRecInput, val.email),
            ];
            form = document.getElementById('login-form');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (listCheck_1.noFalse(valFns)) {
                    let formData = new FormData(form);
                    fetch(`${index_2.HOST}users/user`, {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                        console.log(data);
                        location.replace("home.html");
                    })
                        .catch(console.log);
                }
            });
            recForm = document.getElementById('recovery-pass-form');
            recForm.addEventListener('submit', (event) => {
                event.preventDefault();
                if (listCheck_1.noFalse(valFnsRec)) {
                    let formData = new FormData(recForm);
                    fetch(`${index_2.HOST}users/user/recover`, {
                        method: 'POST',
                        body: formData,
                    })
                        .then(res => res.json())
                        .then(data => {
                        console.log(data);
                        location.replace("recovery.html");
                    })
                        .catch(console.log);
                }
            });
        }
    };
});
