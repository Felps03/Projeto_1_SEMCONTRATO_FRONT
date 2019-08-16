import { HeaderView } from "../views/HeaderView";

export class HeaderController {

    private menuView: HeaderView;

    constructor() {

        this.menuView = new HeaderView('#header');
        this.menuView.update('');
    }

}