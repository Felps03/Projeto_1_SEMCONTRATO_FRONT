import { HOST } from '../config/index';
export class DailyNoteService {
    add(yesterday, today, impediment, date) {
        console.log(new Date().toISOString().slice(0, 10));
        fetch(`${HOST}dailys/daily`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "yesterday": yesterday,
                "today": today,
                "impediment": impediment,
                "date": new Date().toISOString().slice(0, 10),
                "email": localStorage.getItem('email')
            })
        })
            .then(res => res.json())
            .then(res => console.log(res));
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
        $.ajax({
            type: 'GET',
            url: `${HOST}dailys`,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
            error: function (request, tatus, error) {
                console.log("error: ", error);
                console.log("resquest: ", request.responseText);
            }
        });
    }
}
