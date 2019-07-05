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


        
        // fetch(`${HOST}users/authenticate`, {
        fetch('http://localhost:3000/users/authenticate', {
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
        }).then(res => {
            // console.log(res.headers.get("Token"));
            const token = res.headers.get("Token");
            if (token != null) {
                localStorage.setItem('tkn', token);
            }
            return res.json();
        }).then(result => {
            // console.log(token);
            console.log(result);
            localStorage.setItem('email', result[0]['email'])
            // console.log(result[0]['email']);
            window.location.href = "home.html";
        })
        /*.then(res => console.log(res));*/
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

            if (res.status == 400) {
                alert('Codigo invalido');
            }
            if (res.status == 200) {
                const userService = new UserService();
                userService.changePassword(email, password);

            }
        })
            .catch(error => {
                console.log("error: ", error);
                return error;
            });
    }

    logout() {
        fetch(`${HOST}users/logout`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("tkn")}`
            },
        }).then(res => {
            if (res.status == 400) {
                alert("Houve um erro ao Deslogar");
            }
            if (res.status == 200) {
                localStorage.removeItem("tkn");
                localStorage.removeItem("email");
                console.log("deu bom");
                window.location.href = 'index.html';
            }
        }).catch(error => {
            console.log("error: ", error);
            return error;
        })
    }
}