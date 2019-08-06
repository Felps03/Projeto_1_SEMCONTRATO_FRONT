import { User } from '../models/index';
import { HOST } from '../config/index';
//import { async } from 'q';
import { UserService } from './UserService';

declare const grecaptcha: any
export class AuthenticateService {

    /**
     * 
     * @param email para validar usuario
     * @param password para validar usuario
     */
    authenticate(email: string, password: string) {
        return new Promise((resolve, reject) => {
            fetch(`${HOST}users/authenticate`, {
                //fetch('http://localhost:3000/users/authenticate', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "g-recaptcha-response": grecaptcha.getResponse()
                })
            }).then(res => {
                // console.log(res.headers.get("Token"));
                if (res.status !== 200) {
                    return reject(res)
                }

                const token = res.headers.get("Token");
                if (token != null) {
                    localStorage.setItem('tkn', token);
                }

                res.json()
                    .then((result: any) => {
                        // console.log(token);
                        // console.log(result);
                        localStorage.setItem('email', result[0]['email'])
                        localStorage.setItem('id', result[0]['_id'])
                        localStorage.setItem('isAdmin', result[0]['isAdmin'])
                        // console.log(result[0]['email']);
                        window.location.href = "index.html";

                        resolve(res)
                    })
            })
            /*.then(res => console.log(res));*/
        })
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
        }).catch(err => {
            console.log(err);
            return err;
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

    verifyAdmin() {
        return fetch(`${HOST}users/user/check`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
        })
    }
}