import { HOST } from "../config/index";
import { PostAsk } from "../models/PostAsk";

export class HelpCenterAskService {

    add(post: PostAsk) {
        console.log(post)
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
    };

    update(post: PostAsk, ID: string) {
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
    };

    list(page: number) {
        return fetch(`${HOST}helps/ask/list/${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }

    remove(ID: string) {
        return fetch(`${HOST}helps/ask/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }

    findById(ID: string) {
        return fetch(`${HOST}helps/ask/${ID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }

    // TODO: FIND ASK BY POST ID


}