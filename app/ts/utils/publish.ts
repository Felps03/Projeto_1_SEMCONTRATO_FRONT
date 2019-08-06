export function publish(date: Date): string {
    enum weekDay {'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'}
    enum monthName {'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'}
    let day :string = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : '' + date.getUTCDate();
    let hours :string = date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours();
    let minutes :string = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();

    return `publicado em ${weekDay[date.getDay()+1]}, ${day} de ${monthName[date.getUTCMonth()]} de ${date.getUTCFullYear()} às ${hours}:${minutes}.`;
}