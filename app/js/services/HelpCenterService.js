import { HOST } from "../config/index";
export class HelpCenterService {
    add(post) {
        return fetch(`${HOST}helps/post/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
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
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            },
            body: JSON.stringify({
                "id_user": localStorage.getItem('id'),
                "title": post.Title,
                "desc": post.Desc
            })
        });
    }
    ;
    list(page) {
        return fetch(`${HOST}helps/list/post/${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        });
    }
    listLastHelp() {
        return fetch(`${HOST}helps/last/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        });
    }
    remove(ID) {
        return fetch(`${HOST}helps/post/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        });
    }
    findByJoker(joker) {
        return fetch(`${HOST}helps/post/joker/1`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            },
            body: JSON.stringify({
                "joker": joker
            })
        });
    }
}
