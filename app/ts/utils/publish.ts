export function publish(date: Date): string {
    enum weekDay {'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'}
    enum monthName {'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'}
    let day :string = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : '' + date.getUTCDate();

    return `publicado em ${weekDay[date.getDay()+1]}, ${day} de ${monthName[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;
}