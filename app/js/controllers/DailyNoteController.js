System.register(["../models/DailyNote", "../services/DailyNoteService", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DailyNote_1, DailyNoteService_1, index_1, DailyNoteController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNote_1_1) {
                DailyNote_1 = DailyNote_1_1;
            },
            function (DailyNoteService_1_1) {
                DailyNoteService_1 = DailyNoteService_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            DailyNoteController = class DailyNoteController {
                constructor() {
                    this._service = new DailyNoteService_1.DailyNoteService();
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._date.val().replace(/-/g, ','));
                    const dailyNote = new DailyNote_1.DailyNote(this._yesterday.toString(), this._today.toString(), this._impediment.toString(), data);
                    console.log(dailyNote);
                }
                lista(event) {
                    event.preventDefault();
                }
                edita(event) {
                    event.preventDefault();
                }
            };
            __decorate([
                index_1.domInject('#yesterday')
            ], DailyNoteController.prototype, "_yesterday", void 0);
            __decorate([
                index_1.domInject('#today')
            ], DailyNoteController.prototype, "_today", void 0);
            __decorate([
                index_1.domInject('#impediment')
            ], DailyNoteController.prototype, "_impediment", void 0);
            __decorate([
                index_1.domInject('#date')
            ], DailyNoteController.prototype, "_date", void 0);
            exports_1("DailyNoteController", DailyNoteController);
        }
    };
});
