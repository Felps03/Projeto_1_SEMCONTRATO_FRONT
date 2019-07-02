import { User } from '../models/index';
import { HOST } from '../config/index';

export class AuthenticateService {

    /**
     * 
     * @param email para validar usuario
     * @param password para validar usuario
     */
    authenticate(email: string, password: string) {



        fetch(`${HOST}users/authenticate`, {
            method: 'post',
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
        console.log(email);

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
            .then(res => console.log(res));
    }

    /**
     * 
     * @param codigo para recuperar senha de usuario
     * @param email para validar usuario
     */
    verifyCode(codigo: string, email: string) {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('recovery-code-form')

        let formData = new FormData(form)

        $.ajax({
            type: 'POST',
            url: `${HOST}users/code/verify`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data: any) { console.log(data) },
            error: function (request: { responseText: any; }, status: any, error: any) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })
    }

}


