System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function publish(date) {
        let week, day, month, year;
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
        console.log(date);
        console.log('dia semana: ', date.getDay());
        console.log('dia: ', date.getUTCDate());
        console.log('mes: ', date.getUTCMonth() + 1);
        console.log('ano: ', date.getUTCFullYear());
        week = weekDay[date.getDay()];
        date.getUTCDate() < 10 ? day = '0' + date.getUTCDate() : day = date.getUTCDate();
        return `publicado em ${week} , ${day} de ${month} de ${year}.`;
    }
    exports_1("publish", publish);
    return {
        setters: [],
        execute: function () {
        }
    };
});
