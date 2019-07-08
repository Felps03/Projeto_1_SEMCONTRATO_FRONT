import { User } from '../models/index';
import { HOST } from '../config/index';
import { dateOfBirth } from '../validation/userValidate';

export class UserService {

    add(user: User) {
        return fetch(`${HOST}users/user`,{
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "name": user.Name,
                "lastName": user.LastName, 
                "userName": user.UserName,
                "email" : user.Email, 
                "password": user.Password, 
                "dateOfBirth": user.DateOfBirth 
            })
        })
    }

    

    /**
     * listar todos usuários
     */
    // lista() {
    //     $.ajax({
    //         type: 'GET',
    //         url: `${HOST}users`,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         success: function (data) { console.log(data) },
    //         error: function (request, status, error) {
    //             console.log("error: ", error)
    //             console.log("resquest: ", request.responseText)
    //         }
    //     })
    // }

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

    /**
     * 
     * @param id para remover usuário
     */
    // remove(id: string) {
    //     $.ajax({
    //         type: 'DELETE',
    //         url: `${HOST}users/user/${id}`,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         success: function (data) { console.log(data) },
    //         error: function (request, status, error) {
    //             console.log("error: ", error)
    //             console.log("resquest: ", request.responseText)
    //         }
    //     })

    // }

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
        }).then(res => res.json())
            .then(res => console.log(res))
            .catch(error => {
                alert("código inválido");
            });
    }

    /**
     * 
     * @param email para buscar se cadastro ja existe
     */
    // findByEmail(email: string) {
    //     $.ajax({
    //         type: 'GET',
    //         url: `${HOST}users/${email}`,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         success: function (data) { console.log(data) },
    //         error: function (request, status, error) {
    //             console.log("error: ", error)
    //             console.log("resquest: ", request.responseText)
    //         }
    //     })
    // }

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