export function dateGOB(dateG:string){
    let date = dateG.split('-')
    let newDate = date.reverse().map(dateFilter => + dateFilter).join('/')
    return newDate
}