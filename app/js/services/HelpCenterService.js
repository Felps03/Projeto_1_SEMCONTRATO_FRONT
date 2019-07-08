import { HOST } from "../config/index";
export class HelpCenterService {
    add(post) {
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
                "id_user": localStorage.getItem('id')
            })
        });
    }
    ;
    update(post, ID) {
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
    }
    ;
    list() {
        return fetch(`${HOST}helps/post/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    remove(ID) {
        return fetch(`${HOST}helps/post/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    findByTitle(title) {
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
    findByDesc(desc) {
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
