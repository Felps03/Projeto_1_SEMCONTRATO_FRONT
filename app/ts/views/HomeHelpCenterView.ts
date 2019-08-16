import { View } from './View';
import { HomeHelpCenter } from '../models/index';
import { HomeHelpCenters } from '../models/HomeHelpCenters';
import { escapeTag } from '../utils/escapeTag';
import { publish } from '../utils/publish';

export class HomeHelpCenterView extends View<HomeHelpCenters> {

    template(model: HomeHelpCenters): string {
        if (model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma pergunta encontrada.</div>`;
        } else {
            return `
            ${model.toArray().map((post, i) => `
            <a href="app-help-asks.html?id=${post.Id}" class="text-dark">
            <div class="clicker">
            <hr style="height: 1px;">
                <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                    <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                        <div class="responsive-user-help">
                            <img src="https://image.flaticon.com/icons/png/512/64/64572.png" class="home-user-default user-default-image">
                            <h6 class="mt-2 responsive-user-name">${post.Owner ? escapeTag(post.Owner) : ""}</h6>
                        </div>
                    </div>

                    <div class="col-9 col-sm-12 responsive-help-card">
                        <div class="row">
                            <div class="col-12 col-sm-12">

                                <div class="word-cut">   
                                    <h5><strong>${post.Title}</strong></h5>
                                </div>
                                
                                <div class="text-black-50 mt-n2">
                                    <i class="tiny material-icons align-middle">access_alarm</i>
                                    ${publish(post.Date)}
                                </div>
    
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            </a>
            
    
            `).join('')}       
        `;
        }
    }
}