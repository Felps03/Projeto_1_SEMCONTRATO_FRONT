System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function publish(date) {
        let weekDay;
        (function (weekDay) {
            weekDay[weekDay["Dom"] = 0] = "Dom";
            weekDay[weekDay["Seg"] = 1] = "Seg";
            weekDay[weekDay["Ter"] = 2] = "Ter";
            weekDay[weekDay["Qua"] = 3] = "Qua";
            weekDay[weekDay["Qui"] = 4] = "Qui";
            weekDay[weekDay["Sex"] = 5] = "Sex";
            weekDay[weekDay["S\u00E1b"] = 6] = "S\u00E1b";
        })(weekDay || (weekDay = {}));
        let monthName;
        (function (monthName) {
            monthName[monthName["Janeiro"] = 0] = "Janeiro";
            monthName[monthName["Fevereiro"] = 1] = "Fevereiro";
            monthName[monthName["Mar\u00E7o"] = 2] = "Mar\u00E7o";
            monthName[monthName["Abril"] = 3] = "Abril";
            monthName[monthName["Maio"] = 4] = "Maio";
            monthName[monthName["Junho"] = 5] = "Junho";
            monthName[monthName["Julho"] = 6] = "Julho";
            monthName[monthName["Agosto"] = 7] = "Agosto";
            monthName[monthName["Setembro"] = 8] = "Setembro";
            monthName[monthName["Outubro"] = 9] = "Outubro";
            monthName[monthName["Novembro"] = 10] = "Novembro";
            monthName[monthName["Dezembro"] = 11] = "Dezembro";
        })(monthName || (monthName = {}));
        let day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : '' + date.getUTCDate();
        let hours = date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();
        return `publicado em ${weekDay[date.getDay() + 1]}, ${day} de ${monthName[date.getUTCMonth()]} de ${date.getUTCFullYear()} às ${hours}:${minutes}.`;
    }
    exports_1("publish", publish);
    return {
        setters: [],
        execute: function () {
        }
    };
});
