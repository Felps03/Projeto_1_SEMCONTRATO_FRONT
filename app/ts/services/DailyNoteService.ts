import { DailyNote } from '../models/index';
import { HOST } from '../config/index';

export class DailyNoteService {


    add(yesterday: string, today: string, impediment: string, date: Date) {
        console.log(new Date().toISOString().slice(0,10));
        fetch(`${HOST}dailys/daily`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "yesterday": yesterday, 
                "today": today, 
                "impediment": impediment, 
                "date": new Date().toISOString().slice(0,10),
                "email" : localStorage.getItem('email')
            })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    // /**
    //  * 
    //  * @param id para alterar dados do usuário dessa id
    //  */
    // update(id: string) {
    //     const form: HTMLFormElement = <HTMLFormElement>document.getElementById('editdaily-form')

    //     let formData = new FormData(form)

    //     $.ajax({
    //         type: 'PUT',
    //         url: `${HOST}dailys/daily/${id}`,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         data: formData,
    //         success: function (data) { console.log(data) },
    //         error: function (request, status, error) {
    //             console.log("error: ", error)
    //             console.log("resquest: ", request.responseText)
    //         }
    //     })

    // }

    /**
     * 
     * @param data para buscar a daily da data informada
     */
    listDate(data: Date) {
        // $.ajax({
        //     type: 'GET',
        //     url: `${HOST}dailys/daily/${data}`,
        //     contentType: false,
        //     cache: false,
        //     processData: false,
        //     success: function (data) { console.log(data) },
        //     error: function (request, status, error) {
        //         console.log("error: ", error)
        //         console.log("resquest: ", request.responseText)
        //     }
        // })

        fetch(`${HOST}dailys/daily/${data}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "date": data 
            })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    /**
     * 
     * listar todas as dailys
     */
    // listAll() {
    //     let result="";
    //     $.ajax({
    //         type: 'GET',
    //         url: ` $ {HOST}dailys`,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         success: function (data) { 
    //             result = data;
    //             console.log(data) },
    //         error: function (request, tatus, error) {
    //             console.log("error: ", error)
    //             console.log("resq
    //         est: ", request.responseText)
    //         }
    //     })
    //     return result;
    // }
}