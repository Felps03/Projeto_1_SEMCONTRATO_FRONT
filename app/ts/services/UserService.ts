import { User } from '../models/index';
import { HOST } from '../config/index';

export class UserService {
    
    //listar usuários
    lista() {
        
        $.ajax({
            type: 'GET',
            url: `${HOST}users`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data) },
            error: function (request, status, error) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })
    }

    //TODO> refazerverificar sobre foto
    //cadastrar usuário
    cadastro() {

        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('user-register')
        
        let formData = new FormData(form)
            
        $.ajax({
            type: 'POST',
            url: `${HOST}users/user`,
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

    //editar dados do usuário -recebe id
    editar() {

        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('user-edit')
        
        let formData = new FormData(form)
            
        $.ajax({
            type: 'PUT',
            url: `${HOST}users/user/d`,
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

    //remover usuário
    remove(id : string) {
            
        $.ajax({
            type: 'DELETE',
            url: `${HOST}users/user/${id}`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data) },
            error: function (request, status, error) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })

    }

    //alterar senha de usuário - email faltou
    changePassword(password: string) {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('recovery-code-form')
        
        let formData = new FormData(form)
            
        $.ajax({
            type: 'PUT',
            url: `${HOST}users/changePassword`,
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

    //buscar email de usuário
    findByEmail(email : string) {
        
        $.ajax({
            type: 'GET',
            url: `${HOST}users/${email}`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data) },
            error: function (request, status, error) {
                console.log("error: ", error)
                console.log("resquest: ", request.responseText)
            }
        })
    }
    
}