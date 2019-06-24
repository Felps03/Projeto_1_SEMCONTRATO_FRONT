define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function date(date) {
        var inputDate = new Date(date.value);
        var day = inputDate.getDate();
        var month = inputDate.getMonth();
        var year = inputDate.getFullYear();
        var isDate = true;
        if (isNaN(day) || isNaN(month) || isNaN(year))
            isDate = false;
        if (month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11 && day + 1 > 30)
            isDate = false;
        if ((year % 4) != 0 && month + 1 == 2 && day + 1 > 28)
            isDate = false;
        if ((year % 4) == 0 && month + 1 == 2 && day + 1 > 29)
            isDate = false;
        if (!isDate) {
            return 'Data inválida.';
        }
        if (inputDate > new Date()) {
            return 'Obrigatório já ter nascido.';
        }
        return null;
    }
    exports.date = date;
    function email(email) {
        if (!email.value) {
            return 'Email vazio.';
        }
        else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$/.test(email.value)) {
            return 'Email inválido. Exemplo: abc123@def.gh';
        }
    }
    exports.email = email;
    function lastName(lastName) {
        if (!(lastName.value.length > 2)) {
            return 'Sobrenome muito curto.';
        }
        else if (!/[A-Z]([a-z]|\s)+$/.test(lastName.value)) {
            return 'Sobrenome inválido: Use uma letra maiúscula seguida de letras minúsculas.';
        }
        else if (/\s\s/.test(lastName.value)) {
            return 'Sobrenome inválido: Dois ou mais espaços consecutivos.';
        }
        else if (/\s[A-z]\s/.test(lastName.value)) {
            return 'Sobrenome inválido: Caracter solitário :(.';
        }
        return null;
    }
    exports.lastName = lastName;
    function name(name) {
        if (!(name.value.length > 2)) {
            return 'Nome muito curto.';
        }
        else if (!/[A-Z]([a-z]|\s)+$/.test(name.value)) {
            return 'Nome inválido: Use uma letra maiúscula seguida de letras minúsculas.';
        }
        else if (/\s\s/.test(name.value)) {
            return 'Nome inválido: Dois ou mais espaços consecutivos.';
        }
        else if (/\s[A-z]\s/.test(name.value)) {
            return 'Nome inválido: Caracter solitário :(.';
        }
        return null;
    }
    exports.name = name;
    function password(pw) {
        if (pw.value.length < 6 || pw.value.length > 8) {
            return 'Senha deve ter tamanho entre 6 e 8 dígitos.';
        }
        else if (pw.value.indexOf(' ') !== -1) {
            return 'Senha não pode conter espaços.';
        }
        return null;
    }
    exports.password = password;
    function passwordConfirm(pw, confirm) {
        return pw.value !== confirm.value ? 'Senhas não batem' : null;
    }
    exports.passwordConfirm = passwordConfirm;
    var ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];
    function photo(file) {
        var fileExt = file.value.split('.').pop();
        if (ALLOWED_EXTS.indexOf(fileExt) !== -1) {
            return 'Formato de arquivo de imagem inválido.';
        }
        else {
            return null;
        }
    }
    exports.photo = photo;
    function username(username) {
        if (!(username.value.length > 2)) {
            return 'Nome de usuário muito curto.';
        }
        else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
            return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
        }
    }
    exports.username = username;
});
//# sourceMappingURL=validate-fns.js.map