System.register(["./View", "../config/index"], function (exports_1, context_1) {
    "use strict";
    var View_1, index_1, DailyNotesGOBView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            DailyNotesGOBView = class DailyNotesGOBView extends View_1.View {
                template(model) {
                    return `
        
            ${model.paraArray().map(dailyNote => `
            
        <tr> 
            <td> <img class="rounded-circle" height="70" src="${dailyNote.Photo ? `${index_1.GOB_HOST}public/uploads/${dailyNote.Photo}` : `${index_1.GOB_HOST}public/img/user.png`}"></td> 
            <td> ${dailyNote.User} </td> 
            <td> ${dailyNote.Date} </td> 
            <td> ${dailyNote.Yesterday} </td> 
            <td> ${dailyNote.Today} </td> 
            <td> ${dailyNote.Impediment} </td> 
        </tr>
            `).join('')}
 
    `;
                }
            };
            exports_1("DailyNotesGOBView", DailyNotesGOBView);
        }
    };
});
