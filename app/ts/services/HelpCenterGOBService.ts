import { GOB_HOST } from "../config/index";

export class HelpCenterGOBService {

    list(page: number) {
        return fetch(`${GOB_HOST}helpcenter/atividade/${page}`, {
            method: 'GET'
        })
    }

    // //FIXME
    // listLastHelp() {
    //     return fetch(`${GOB_HOST}helps/list/post/1`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
    //             'id_user': localStorage.getItem('id')
    //         }
    //     })
    // }

    findByJoker(joker: string, page: number) {
        return fetch(`${GOB_HOST}helpcenter/query/${joker}/${page}`, {
            method: 'GET'
        })
    }

}