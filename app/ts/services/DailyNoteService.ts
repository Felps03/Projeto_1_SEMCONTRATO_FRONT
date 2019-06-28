import { DailyNote } from '../models/index';
import { HOST } from '../config/index';

export class DailyNoteService {

    /**
     * adicionar uma daily
     */
    add() {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('daily-form')

        let formData = new FormData(form)

        $.ajax({
            type: 'POST',
            url: `${HOST}dailys/daily`,
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
    update(id: string) {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById('editdaily-form')

        let formData = new FormData(form)

        $.ajax({
            type: 'PUT',
            url: `${HOST}dailys/daily/${id}`,
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
     * @param data para buscar a daily da data informada
     */
    listDate(data: Date) {
        $.ajax({
            type: 'GET',
            url: `${HOST}dailys/daily/${data}`,
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
     * listar todas as dailys
     */
    listAll() {
        $.ajax({
            type: 'GET',
            url: `${HOST}dailys`,
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