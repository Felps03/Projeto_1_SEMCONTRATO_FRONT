import { HOST } from '../config/index';
import { dateOfBirth } from '../validation/userValidate';
export class UserService {
    add(user) {
        return fetch(`${HOST}users/user`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": user.Name,
                "lastName": user.LastName,
                "userName": user.UserName,
                "email": user.Email,
                "password": user.Password,
                "dateOfBirth": user.DateOfBirth
            })
        });
    }
    update(user, ID) {
        console.log(user.DateOfBirth);
        let dataFormatada;
        if (dateOfBirth != null) {
            let dia = new Date(user.DateOfBirth).getDay();
            let mes = new Date(user.DateOfBirth).getMonth() + 1;
            let ano = new Date(user.DateOfBirth).getFullYear();
            let d;
            if (dia < 10) {
                d = "0" + dia.toString();
            }
            let m;
            if (mes < 10) {
                m = "0" + mes.toString();
            }
            dataFormatada = ano + "-" + m + "-" + d;
        }
        fetch(`${HOST}users/user/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "name": user.Name,
                "userName": user.UserName,
                "lastName": user.LastName,
                "dateOfBirth": dataFormatada,
                "email": user.Email,
                "password": user.Password
            })
        }).then(res => res.json())
            .then(res => console.log(res))
            .catch(error => {
            console.log(error);
        });
    }
    changePassword(email, password) {
        console.log(email, " | ", password);
        fetch(`${HOST}users/changePassword`, {
            method: 'POST',
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
    getData() {
        const email = localStorage.getItem('email');
        return fetch(`${HOST}users/${email}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
        });
    }
}
