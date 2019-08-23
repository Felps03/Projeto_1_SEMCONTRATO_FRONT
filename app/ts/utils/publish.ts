export function publish(date: Date): string {
    enum weekDay { 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' }
    enum monthName { 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' }
    let day: string = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : '' + date.getUTCDate();
    let week: string = weekDay[(date.getDay() + 1) % 7];
    let month: string = monthName[date.getUTCMonth()];
    let year: number = date.getUTCFullYear();

    const monthNumber = date.getUTCMonth() + 1

    const returnData = `&nbsp
    <text class="desk-date">publicado em ${week}, ${day} de ${month} de ${year}.</text>
    <text class="mob-date">publicado em ${day}/${monthNumber < 10 ? '0' + monthNumber : monthNumber}/${year}</text>`;   

    return returnData;
}