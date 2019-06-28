import { User } from '../models/index';
import { HOST } from '../config/index';

export class UserService {
    
    /**
     * listar todos usuários
     */
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

    /**
     * cadastrar um usuário
     * TODO: verificar como tratar foto
     */
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

    /**
     * 
     * @param id para alterar dados do usuário dessa id
     */
    editar(id: string) {

        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('user-edit')
        
        let formData = new FormData(form)
            
        $.ajax({
            type: 'PUT',
            url: `${HOST}users/user/${id}`,
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
     * @param id para remover usuário
     */
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

    /**
     * 
     * @param email para alterar senha do usuário
     * @param password nova senha
     */
    changePassword(email: string, password: string) {
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

    /**
     * 
     * @param email para buscar se cadastro ja existe
     */
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