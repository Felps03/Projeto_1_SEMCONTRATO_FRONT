System.register(["./validate/index", "./config/index", "./validate-fns", "./utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, val, listCheck_1, yesterday, today, impediment, valFns, form;
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
            yesterday = index_1.InputWrapper.fromId('first');
            today = index_1.InputWrapper.fromId('second');
            impediment = index_1.InputWrapper.fromId('third');
            valFns = [
                index_1.validate(yesterday, val.yesterday),
                index_1.validate(today, val.today),
                index_1.validate(impediment, val.impediment),
            ];
            form = document.getElementById('daily-form');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (listCheck_1.noFalse(valFns)) {
                    let formData = new FormData(form);
                    fetch(`${index_2.HOST}dailys/daily`, {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                        console.log(data);
                        location.replace("app-daily-note.html");
                    })
                        .catch(console.log);
                }
            });
        }
    };
});
