var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./validate/index", "./config/index", "./validate-fns"], function (require, exports, index_1, index_2, val) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    val = __importStar(val);
    var emailInput = index_1.InputWrapper.fromId('email');
    var passwordInput = index_1.InputWrapper.fromId('password');
    index_1.validate(emailInput, val.email);
    index_1.validate(passwordInput, val.password);
    var form = document.getElementById('login-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        console.log(formData);
        fetch(index_2.HOST + 'users/authenticate', {
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
//# sourceMappingURL=user-login-utils.js.map