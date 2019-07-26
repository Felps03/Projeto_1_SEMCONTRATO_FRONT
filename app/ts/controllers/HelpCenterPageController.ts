import { Posts } from '../models/index';
import { HelpCenterService } from '../services/index';


export class HelpCenterPageController {
    private currentPage: number;

    constructor(currentPage: number = 1) {
        this.currentPage = currentPage;
    }

    list(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService
            .list(this.currentPage, null)
            .then((result) => {
                return result.json();
            })
            .then((res) => {
                // console.log(res);

                const posts = Posts.from(res.slice(0, -1));
                //view pagina
                Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
                    const i = el.getAttribute('data-i');
                    if (i) {
                        el.addEventListener('click', () => {
                            //this.<viewPagina>.update(posts.get(+i));
                        });
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}