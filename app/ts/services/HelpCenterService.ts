import { HOST } from "../config/index";
import { Post } from "../models/Post";

export class HelpCenterService {

    add(post: Post) {
        return fetch(`${HOST}helps/post/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "title": post.Title,
                "desc": post.Desc,
                "id_user": post.Author
            })
        });
    };

    update(post: Post, ID: string) {
        return fetch(`${HOST}helps/post/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "id_user": post.Author,
                "title": post.Title,
                "desc": post.Desc
            })
        });
    };

    list() {
        return fetch(`${HOST}helps/post/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    listLastHelp() {
        return fetch(`${HOST}helps/post/list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    remove(ID: string) {
        return fetch(`${HOST}helps/post/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    findByTitle(title: string) {
        return fetch(`${HOST}helps/post/title`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "title": title
            })
        });
    }

    findByDesc(desc: string) {
        return fetch(`${HOST}helps/post/desc`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "desc": desc
            })
        });
    }
}