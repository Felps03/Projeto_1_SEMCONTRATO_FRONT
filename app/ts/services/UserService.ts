import { User } from '../models/index';
import { HOST } from '../config/index';
import { dateOfBirth } from '../validation/userValidate';

export class UserService {

    add(user: User) {
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
        })
    }



    /**
     * listar todos usuários
     */
    list() {
        return fetch(`${HOST}admin/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    /**
     * cadastrar um usuário
     * TODO: verificar como tratar foto
     */


    /**
     * 
     * @param id para alterar dados do usuário dessa id
     */
    update(user: User, ID: string) {
        let dateOfBirth = user.DateOfBirth.replace(/,/g, '-');

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
                "password": user.Password,
                "dateOfBirth": dateOfBirth
            })
        })
    };

    /**
     * 
     * @param id para remover usuário
     */

    remove(ID: string) {
        return fetch(`${HOST}users/user/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        }).catch();
    }

    /**
     * 
     * @param email para alterar senha do usuário
     * @param password nova senha
     */


    changePassword(email: string, password: string) {
        console.log(email, " | ", password);
        fetch(`${HOST}users/changePassword`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                //,'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
    }

    /**
     * 
     * @param email para buscar se cadastro ja existe
     */
    findByEmail(email: string) {
        return fetch(`${HOST}users/${email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
        })
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
        })
    }

}