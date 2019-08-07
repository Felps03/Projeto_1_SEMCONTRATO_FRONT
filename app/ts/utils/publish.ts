export function publish(date: Date): string {
    enum weekDay {'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'}
    enum monthName {'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'}
    let day :string = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : '' + date.getUTCDate();
    let week :string = weekDay[date.getDay()+1];
    let month :string = monthName[date.getUTCMonth()];
    let year :number = date.getUTCFullYear();

    if (window.innerWidth > 576) {
        return `publicado em ${week}, ${day} de ${month} de ${year}.`;
    } else {
        return `publicado em ${day}/${date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth()}/${year}`
    }
    
}