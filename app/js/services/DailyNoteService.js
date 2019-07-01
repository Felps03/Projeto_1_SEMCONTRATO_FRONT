import { HOST } from '../config/index';
export class DailyNoteService {
    add(form) {
        let formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: `${HOST}dailys/daily`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    update(id) {
        const form = document.getElementById('editdaily-form');
        let formData = new FormData(form);
        $.ajax({
            type: 'PUT',
            url: `${HOST}dailys/daily/${id}`,
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    listDate(data) {
        $.ajax({
            type: 'GET',
            url: `${HOST}dailys/daily/${data}`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) { console.log(data); },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
    listAll() {
        let result = "";
        $.ajax({
            type: 'GET',
            url: `${HOST}dailys`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                result = data;
                console.log(data);
            },
            error: function (request, status, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
        return result;
    }
}
