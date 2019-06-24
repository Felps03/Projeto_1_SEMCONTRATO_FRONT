define(["require", "exports", "./validate/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dateInput = index_1.InputWrapper.fromId('birthdate');
    var emailInput = index_1.InputWrapper.fromId('email');
    var lastNameInput = index_1.InputWrapper.fromId('lastname');
    var nameInput = index_1.InputWrapper.fromId('name');
    var passwordInput = index_1.InputWrapper.fromId('password');
    var passwordConfirmInput = index_1.InputWrapper.fromId('passwordConfirm');
    var photoInput = index_1.InputWrapper.fromId('photo');
    var usernameInput = index_1.InputWrapper.fromId('username');
    index_1.validate(dateInput, valDate);
    index_1.validate(emailInput, valEmail);
    index_1.validate(lastNameInput, valLastName);
    index_1.validate(nameInput, valName);
    index_1.validate(passwordInput, valPassword);
    index_1.validate(passwordConfirmInput, valPasswordConfirm, passwordInput);
    index_1.validate(photoInput, valPhoto);
    index_1.validate(usernameInput, valUserName);
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
        var formData = new FormData(form);
        fetch('https://semcontrato.herokuapp.com/' + 'users/user', {
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
    function valDate(date) {
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
    function valEmail(email) {
        if (!email.value) {
            return 'Email vazio.';
        }
        else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}?/.test(email.value)) {
            return 'Email inválido. Exemplo: abc123@def.gh';
        }
    }
    function valLastName(lastName) {
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
    function valName(name) {
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
    function valPassword(pw) {
        if (pw.value.length < 6 || pw.value.length > 8) {
            return 'Senha deve ter tamanho entre 6 e 8 dígitos.';
        }
        else if (pw.value.indexOf(' ') !== -1) {
            return 'Senha não pode conter espaços.';
        }
        return null;
    }
    function valPasswordConfirm(pw, confirm) {
        return pw.value !== confirm.value ? 'Senhas não batem' : null;
    }
    var ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];
    function valPhoto(file) {
        var fileExt = file.value.split('.').pop();
        if (ALLOWED_EXTS.indexOf(fileExt) !== -1) {
            return 'Formato de arquivo de imagem inválido.';
        }
        else {
            return null;
        }
    }
    function valUserName(username) {
        if (!(username.value.length > 2)) {
            return 'Nome de usuário muito curto.';
        }
        else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
            return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
        }
    }
});
//# sourceMappingURL=user-register-utils.js.map