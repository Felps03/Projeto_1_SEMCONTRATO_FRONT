"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./validate/index");
var index_2 = require("./config/index");
var val = __importStar(require("./validate-fns"));
var listCheck_1 = require("./utils/listCheck");
var yesterday = index_1.InputWrapper.fromId('first');
var today = index_1.InputWrapper.fromId('second');
var impediment = index_1.InputWrapper.fromId('third');
var valFns = [
    index_1.validate(yesterday, val.yesterday),
    index_1.validate(today, val.today),
    index_1.validate(impediment, val.impediment),
];
var form = document.getElementById('daily-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (listCheck_1.noFalse(valFns)) {
        var formData = new FormData(form);
        fetch(index_2.HOST + "dailys/daily", {
            method: 'POST',
            body: formData
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            location.replace("app-daily-note.html");
        })
            .catch(console.log);
    }
});
//# sourceMappingURL=app-dailyNote-utils.js.map