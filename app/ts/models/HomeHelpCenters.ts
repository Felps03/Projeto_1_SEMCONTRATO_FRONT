import { HomeHelpCenter } from './index';

export class HomeHelpCenters {

    private _homeHelpCenters: HomeHelpCenter[] = [];

    add(helpCenter: HomeHelpCenter): void {
        this._homeHelpCenters.push(helpCenter);
    }

    toArray(): HomeHelpCenter[] {
        return ([] as HomeHelpCenter[]).concat(this._homeHelpCenters);
    }
}