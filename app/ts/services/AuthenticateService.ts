import { User } from '../models/index';
import { HOST } from '../config/index';
import { async } from 'q';
import { UserService } from './UserService';

export class AuthenticateService {

    /**
     * 
     * @param email para validar usuario
     * @param password para validar usuario
     */
    authenticate(email: string, password: string) {



        fetch(`${HOST}users/authenticate`, {
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
            .then(res => console.log(res));
    }

    /**
     * 
     * @param email para recuperação de senha
     */
    resetPassword(email: string) {
        fetch(`${HOST}users/user/recover`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.href = 'index.html';
            });
    }


    verifyCode(emailCode: any, email: string, password: string) {

        fetch(`${HOST}users/code/verify`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emailCode": emailCode,
                "email": email
            })
        }).then(res => { 
            
            if(res.status == 400){
                alert('Codigo invalido');
            } 
            if(res.status == 200) {
                const userService = new UserService();
                userService.changePassword(email, password);
                
            }
        })
        .catch(error => {
            console.log("error: ", error);
            return error;
        });
    }
}