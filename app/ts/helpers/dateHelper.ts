export function dateFormatYYYYMMDD(data: Date): string {
    let date = data.toLocaleDateString('pt-BR').slice(0, 10).toString();

    let year = date.slice(6, 10);
    let month = date.slice(3, 5);
    let day = date.slice(0, 2);

    let fullDate = `${year}-${month}-${day}`;

    return fullDate;
}