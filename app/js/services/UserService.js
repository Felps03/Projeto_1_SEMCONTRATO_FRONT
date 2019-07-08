import { HOST } from '../config/index';
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
        let dateOfBirth = user.DateOfBirth.replace(/,/g, '-');
        return fetch(`${HOST}users/user/${ID}`, {
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
                "dateOfBirth": dateOfBirth,
                "email": user.Email,
                "password": user.Password
            })
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
