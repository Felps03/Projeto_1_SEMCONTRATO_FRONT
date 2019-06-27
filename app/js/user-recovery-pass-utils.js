System.register(["./validate/index", "./config/index", "./validate-fns", "./utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, val, listCheck_1, codeInput, emailInput, passwordInput, passwordConfirmInput, valFns, form;
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
            codeInput = index_1.InputWrapper.fromId('code');
            emailInput = index_1.InputWrapper.fromId('email_rec');
            passwordInput = index_1.InputWrapper.fromId('password_rec');
            passwordConfirmInput = index_1.InputWrapper.fromId('password_rec_conf');
            valFns = [
                index_1.validate(codeInput, val.code),
                index_1.validate(emailInput, val.email),
                index_1.validate(passwordInput, val.password),
                index_1.validate(passwordConfirmInput, val.passwordConfirm, passwordInput),
            ];
            form = document.getElementById('recovery-code-form');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (listCheck_1.noFalse(valFns)) {
                    let formData = new FormData(form);
                    fetch(`${index_2.HOST}users/code/verify`, {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                        console.log(data);
                        location.replace("index.html");
                    })
                        .catch(console.log);
                }
            });
        }
    };
});
