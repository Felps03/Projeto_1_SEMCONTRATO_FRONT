import { User } from '../models/index';
import { HOST } from '../config/index';

export class AuthenticateService {

    /**
     * 
     * @param email para validar usuario
     * @param password para validar usuario
     */
    authenticate(email: string, password: string) {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('login-form')
        
        let formData = new FormData(form)
            
        $.ajax({
            type: 'POST',
            url: `${HOST}users/authenticate`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data) },
            error: function (request, status, error) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })
    }
    
    /**
     * 
     * @param email para recuperação de senha
     */
    resetPassword(email: string) {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('recovery-pass-form')
        
        let formData = new FormData(form)
            
        $.ajax({
            type: 'POST',
            url: `${HOST}users/user/recover`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data) },
            error: function (request, status, error) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })
        
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
            success: function (data) { console.log(data) },
            error: function (request, status, error) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })
    }

}


