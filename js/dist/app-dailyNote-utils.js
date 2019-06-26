"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./config/index");
var form = document.getElementById('daily-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(form);
    fetch(index_1.HOST + "dailys/daily", {
        method: 'POST',
        body: formData
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        location.replace("app-daily-note.html");
    })
        .catch(console.log);
});
//# sourceMappingURL=app-dailyNote-utils.js.map