import { View } from './View';
import { HomeHelpCenter } from '../models/index';
import { HomeHelpCenters } from '../models/HomeHelpCenters';

export class HomeHelpCenterView extends View<HomeHelpCenters> {

    template(model: HomeHelpCenters): string {
        return `
            ${model.toArray().map(homeHelpCenter =>`
                <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                    <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                        <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                            <div>
                                <h5 class="mt-2 mb-2 ml-4">${homeHelpCenter.Owner}</h5>
                                <p class="mt-2 mb-2 ml-4">${homeHelpCenter.Date.getUTCDate() < 10 ? "0" + homeHelpCenter.Date.getUTCDate() : homeHelpCenter.Date.getUTCDate()}/${homeHelpCenter.Date.getUTCMonth()+1 < 10 ? "0" + (homeHelpCenter.Date.getUTCMonth()+1) : homeHelpCenter.Date.getUTCMonth()+1}/${homeHelpCenter.Date.getUTCFullYear()}</p>
                                <button type="button" name="view"
                                    class="btn btn-outline-info btn-sm input-circle pt-2 ml-4" id="resp-view"
                                    data-toggle="modal" data-target="#respModal">
                                    <i class="small material-icons">description</i>
                                </button>
                            </div>  
                        </div>
                    </div>
                    <div class="col-md-9 col-12 card-body">
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5>${homeHelpCenter.Title}</h5>
                                <p>${homeHelpCenter.Description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }
}
