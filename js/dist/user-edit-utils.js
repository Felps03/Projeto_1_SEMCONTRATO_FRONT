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
var emailInput = index_1.InputWrapper.fromId('email');
index_1.validate(emailInput, val.email);
var form = document.getElementById('login-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(form);
    fetch(index_2.HOST + "users/authenticate", {
        method: 'GET',
        body: formData
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        location.replace("home.html");
    })
        .catch(console.log);
});
//# sourceMappingURL=user-edit-utils.js.map