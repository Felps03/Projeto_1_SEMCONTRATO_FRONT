import { User } from '../models/index';
import { HOST } from '../config/index';
//import { async } from 'q';
import { UserService } from './UserService';

export class AuthenticateService {

    /**
     * 
     * @param email para validar usuario
     * @param password para validar usuario
     */
    authenticate(email: string, password: string) {



        return fetch(`${HOST}users/authenticate`, {
            //fetch('http://localhost:3000/users/authenticate', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        /*.then(res => console.log(res));*/
    }

    /**
     * 
     * @param email para recuperação de senha
     */
    resetPassword(email: string) {
        return fetch(`${HOST}users/user/recover`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        })
    }


    verifyCode(emailCode: any, email: string, password: string) {

       return fetch(`${HOST}users/code/verify`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emailCode": emailCode,
                "email": email
            })
        })
        // Comentado porque não achei onde chama
        // .then(res => {

        //     if (res.status == 400) {
        //         alert('Codigo invalido');
        //     }
        //     if (res.status == 200) {
        //         const userService = new UserService();
        //         userService.changePassword(email, password);

        //     }
        // })
        //     .catch(error => {
        //         console.log("error: ", error);
        //         return error;
        //     });
    }

    logout() {
        return fetch(`${HOST}users/logout`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("tkn")}`
            },
        })
    }
}