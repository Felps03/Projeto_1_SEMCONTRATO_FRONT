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
var dateInput = index_1.InputWrapper.fromId('birthdate');
var emailInput = index_1.InputWrapper.fromId('email');
var lastNameInput = index_1.InputWrapper.fromId('lastname');
var nameInput = index_1.InputWrapper.fromId('name');
var passwordInput = index_1.InputWrapper.fromId('password');
var passwordConfirmInput = index_1.InputWrapper.fromId('passwordConfirm');
var photoInput = index_1.InputWrapper.fromId('photo');
var usernameInput = index_1.InputWrapper.fromId('username');
var valFns = [
    index_1.validate(dateInput, val.date),
    index_1.validate(emailInput, val.email),
    index_1.validate(lastNameInput, val.lastName),
    index_1.validate(nameInput, val.name),
    index_1.validate(passwordInput, val.password),
    index_1.validate(passwordConfirmInput, val.passwordConfirm, passwordInput),
    index_1.validate(photoInput, val.photo),
    index_1.validate(usernameInput, val.username),
];
var send = document.getElementById("file_send");
var customTxt = document.getElementById("custom-text");
send.addEventListener("click", function () {
    photoInput.el.click();
});
photoInput.el.addEventListener("change", function () {
    if (photoInput.value) {
        customTxt.innerHTML = photoInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    else {
        customTxt.innerHTML = "Nenhuma imagem selecionada.";
    }
});
var form = document.getElementById('user-register');
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
                    location.replace("index.html");
                })
                    .catch(console.log);
            });
        });
    }
});
//# sourceMappingURL=user-register-utils.js.map