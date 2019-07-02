import { HOST } from '../config/index';
export class UserService {
    cadastro(usuario) {
        const form = document.getElementById('user-register');
        let formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: `${HOST}users/user`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    lista() {
        $.ajax({
            type: 'GET',
            url: `${HOST}users`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    editar(id) {
        const form = document.getElementById('user-edit');
        let formData = new FormData(form);
        $.ajax({
            type: 'PUT',
            url: `${HOST}users/user/${id}`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    remove(id) {
        $.ajax({
            type: 'DELETE',
            url: `${HOST}users/user/${id}`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    changePassword(email, password) {
        console.log(email, " | ", password);
        fetch(`${HOST}users/changePassword`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => res.json())
            .then(res => console.log(res))
            .catch(error => {
            alert("código inválido");
        });
    }
    findByEmail(email) {
        $.ajax({
            type: 'GET',
            url: `${HOST}users/${email}`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
}
