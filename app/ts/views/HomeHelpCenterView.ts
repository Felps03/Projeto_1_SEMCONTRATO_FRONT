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
            
                <hr style="height: 1px;">
                <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                    <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                        <div class="responsive-user-help">
                            <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                            <h6 class="mt-2 responsive-user-name">${post.Owner ? escapeTag(post.Owner) : ""}</h6>
                        </div>
                    </div>

                    <div class="col-9 col-sm-12 responsive-help-card">
                        <div class="row">
                            <div class="col-12 col-sm-12">

                                <div id="user-main responsive-help-drop">
                                    
                                        

                                            <a class= txt-primary res-help-resp" href="app-help-asks.html?id=${post.Id}" id="response-help">
                                                <i class="material-icons mr-n4 mt-1 float-right response-help-mob">question_answer</i></a>
    
                                
                                </div>
                                <div class="word-cut">   
                                    <h5><strong>${post.Title}</strong></h5>
                                </div>
                                <a href="app-help-asks.html?id=${post.Id}" class="float-right d-flex justify-content-center mr-n3">
                                    <button type="button" class="btn btn-outline-info btn-sm  pr-3 pl-3 mt-n4 input-circle responsive-help-buttons" id="response-help">
                                        <i class="small material-icons mr-2 align-middle">question_answer</i>
                                        <text class="responsive-help-buttons">Responder</text>
                                    </button>
                                </a>

                                <div class="text-black-50 mt-n2">
                                    <i class="tiny material-icons align-middle">access_alarm</i>
                                    ${publish(post.Date)}
                                </div>
    
                            </div>
                        </div>
                        <div class="mt-1 text-justify mb-2 mb-4">${post.Description}</div> 
                    </div> 
                </div>
            
    
            `).join('')}       
        `;
        }
    }
}