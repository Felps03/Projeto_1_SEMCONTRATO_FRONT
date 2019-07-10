import { HOST } from "../config/index";
export class HelpCenterAskService {
    add(post) {
        console.log(post);
        return fetch(`${HOST}helps/ask/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "id_user": post.Author,
                "desc": post.Desc,
                "id_helpCenter": post.helpCenter
            })
        });
    }
    ;
    update(post, ID) {
        return fetch(`${HOST}helps/ask/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "id_user": post.Author,
                "desc": post.Desc,
                "id_helpCenter": post.helpCenter
            })
        });
    }
    ;
    list(page) {
        return fetch(`${HOST}helps/ask/list/${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
    remove(ID) {
        return fetch(`${HOST}helps/ask/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    findById(ID) {
        return fetch(`${HOST}helps/ask/${ID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
}
