System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, ConfigurationService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            ConfigurationService = class ConfigurationService {
                listAll() {
                    return fetch(`${index_1.HOST}configuration`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                        }
                    });
                }
            };
            exports_1("ConfigurationService", ConfigurationService);
        }
    };
});
