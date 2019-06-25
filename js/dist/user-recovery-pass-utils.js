var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./validate/index", "./config/index", "./validate-fns", "./utils/listCheck"], function (require, exports, index_1, index_2, val, listCheck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    val = __importStar(val);
    var codeInput = index_1.InputWrapper.fromId('code');
    var emailInput = index_1.InputWrapper.fromId('email_rec');
    var passwordInput = index_1.InputWrapper.fromId('password_rec');
    var passwordConfirmInput = index_1.InputWrapper.fromId('password_rec_conf');
    var valFns = [
        index_1.validate(codeInput, val.code),
        index_1.validate(emailInput, val.email),
        index_1.validate(passwordInput, val.password),
        index_1.validate(passwordConfirmInput, val.passwordConfirm, passwordInput),
    ];
    var form = document.getElementById('recovery-code-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (listCheck_1.noFalse(valFns)) {
            var formData = new FormData(form);
            fetch(index_2.HOST + "users/code/verify", {
                method: 'POST',
                body: formData
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data);
                location.replace("index.html");
            })
                .catch(console.log);
        }
    });
});
//# sourceMappingURL=user-recovery-pass-utils.js.map