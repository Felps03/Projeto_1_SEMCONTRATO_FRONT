System.register([], function (exports_1, context_1) {
    "use strict";
    var ALLOWED_EXTS;
    var __moduleName = context_1 && context_1.id;
    function name(name) {
        if (!(name.value.trim().length > 2)) {
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
    exports_1("name", name);
    function lastName(lastName) {
        if (!(lastName.value.trim().length > 2)) {
            return 'Sobrenome muito curto.';
        }
        else if (!/[A-Z]([a-z]|\s)+$/.test(lastName.value)) {
            return 'Sobren6ome inválido: Use uma letra maiúscula seguida de letras minúsculas.';
        }
        else if (/\s\s/.test(lastName.value)) {
            return 'Sobrenome inválido: Dois ou mais espaços consecutivos.';
        }
        else if (/\s[A-z]\s/.test(lastName.value)) {
            return 'Sobrenome inválido: Caracter solitário :(.';
        }
        return null;
    }
    exports_1("lastName", lastName);
    function username(username) {
        if (!(username.value.trim().length > 2)) {
            return 'Nome de usuário muito curto.';
        }
        else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
            return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
        }
        return null;
    }
    exports_1("username", username);
    function email(email) {
        if (!email.value.trim()) {
            return 'Email vazio.';
        }
        else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$/.test(email.value)) {
            return 'Email inválido. Exemplo: abc123@def.gh';
        }
        return null;
    }
    exports_1("email", email);
    function photo(file) {
        if (!file.value) {
            return 'Imagem obrigatória.';
        }
        const fileExt = file.value.split('.').pop();
        if (!fileExt || ALLOWED_EXTS.indexOf(fileExt) === -1) {
            return 'Formato de arquivo de imagem inválido.';
        }
        return null;
    }
    exports_1("photo", photo);
    function password(pw) {
        if (pw.value.trim().length < 6 || pw.value.trim().length > 8) {
            return 'Senha deve ter tamanho entre 6 e 8 dígitos.';
        }
        else if (pw.value.indexOf(' ') !== -1) {
            return 'Senha não pode conter espaços.';
        }
        return null;
    }
    exports_1("password", password);
    function editPassword(pw) {
        if (pw.value || pw.el.getAttribute('disabled') == null) {
            return password(pw);
        }
        return null;
    }
    exports_1("editPassword", editPassword);
    function passwordConfirm(pw, confirm) {
        if (!pw.value.trim()) {
            return 'Confirmação obrigatória.';
        }
        else if (pw.value !== confirm.value) {
            return 'Senhas não batem';
        }
        return null;
    }
    exports_1("passwordConfirm", passwordConfirm);
    function editPasswordConfirm(pw, confirm) {
        if (pw.value && confirm.value || (pw.el.getAttribute('disabled') == null && confirm.getAttribute('disabled') == null)) {
            return passwordConfirm(pw, confirm);
        }
        return null;
    }
    exports_1("editPasswordConfirm", editPasswordConfirm);
    function code(code) {
        if (!code.value.trim()) {
            return 'Código obrigatório.';
        }
        return null;
    }
    exports_1("code", code);
    function dateOfBirth(date) {
        const inputDate = new Date(date.value.trim());
        const day = inputDate.getDate();
        const month = inputDate.getMonth();
        const year = inputDate.getFullYear();
        let isDate = true;
        if (isNaN(day) || isNaN(month) || isNaN(year))
            isDate = false;
        if ((month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11) && day > 30)
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
    exports_1("dateOfBirth", dateOfBirth);
    return {
        setters: [],
        execute: function () {
            ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];
        }
    };
});
