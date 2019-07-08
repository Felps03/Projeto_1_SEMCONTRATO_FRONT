import { HOST } from "../config/index";
import {PostAsk} from "../models/PostAsk";

export class HelpCenterAskService {

    add(post: PostAsk) {
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

    list() {
        return fetch(`${HOST}helps/ask`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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

   
}