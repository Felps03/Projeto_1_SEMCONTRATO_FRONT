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
                "dateOfBirth": user.DateOfBirth,
                "password": user.Password
            })
        });
    }
    list() {
        return fetch(`${HOST}admin/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    update(user, ID) {
        let dateOfBirth = user.DateOfBirth.replace(/,/g, '-');
        if (user.Password == '') {
            return fetch(`${HOST}users/user/${ID}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                },
                body: JSON.stringify({
                    "name": user.Name,
                    "lastName": user.LastName,
                    "userName": user.UserName,
                    "email": user.Email,
                    "dateOfBirth": dateOfBirth
                })
            });
        }
        else {
            return fetch(`${HOST}users/user/${ID}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                },
                body: JSON.stringify({
                    "name": user.Name,
                    "lastName": user.LastName,
                    "userName": user.UserName,
                    "email": user.Email,
                    "dateOfBirth": dateOfBirth,
                    "password": user.Password
                })
            });
        }
    }
    ;
    remove(ID) {
        return fetch(`${HOST}users/user/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    changePassword(email, password) {
        return fetch(`${HOST}users/changePassword`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
    }
    findByEmail(email) {
        return fetch(`${HOST}users/${email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
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
