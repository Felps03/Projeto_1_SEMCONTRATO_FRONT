import { HOST } from '../config/index';
export class DailyNoteService {
    add(yesterday, today, impediment, date) {
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
                "email": localStorage.getItem('email')
            })
        })
            .then(res => res.json())
            .then(res => {
            if (res.status == 200) {
                console.log("funcionou");
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
