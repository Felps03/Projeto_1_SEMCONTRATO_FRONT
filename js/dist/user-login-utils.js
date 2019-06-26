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
var emailInput = index_1.InputWrapper.fromId('email');
var passwordInput = index_1.InputWrapper.fromId('password');
var emailRecInput = index_1.InputWrapper.fromId('email_rec');
var valFns = [
    index_1.validate(emailInput, val.email),
    index_1.validate(passwordInput, val.password),
];
var valFnsRec = [
    index_1.validate(emailRecInput, val.email),
];
var form = document.getElementById('login-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (listCheck_1.noFalse(valFns)) {
        grecaptcha.ready(function () {
            grecaptcha.execute('6LemuakUAAAAALHHE5_7NL8FwKzEvCXLXzUUqahn', { action: 'user_register' })
                .then(function (token) {
                var formData = new FormData(form);
                formData.append('recaptchaToken', token);
                fetch(index_2.HOST + "users/user", {
                    method: 'POST',
                    body: formData
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    console.log(data);
                    location.replace("home.html");
                })
                    .catch(console.log);
            });
        });
    }
});
var recForm = document.getElementById('recovery-pass-form');
recForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (listCheck_1.noFalse(valFnsRec)) {
        grecaptcha.ready(function () {
            grecaptcha.execute('6LemuakUAAAAALHHE5_7NL8FwKzEvCXLXzUUqahn', { action: 'user_register' })
                .then(function (token) {
                var formData = new FormData(form);
                formData.append('recaptchaToken', token);
                fetch(index_2.HOST + "users/user/recover", {
                    method: 'POST',
                    body: formData,
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    console.log(data);
                    location.replace("recovery.html");
                })
                    .catch(console.log);
            });
        });
    }
});
//# sourceMappingURL=user-login-utils.js.map