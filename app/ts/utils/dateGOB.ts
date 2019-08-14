export function dateGOB(dateG: string) {
    let date = dateG.split('-')
    let newDate = date.reverse().map(dateFilter => + dateFilter).join('/')
    return newDate
}

export function reverseDateGOB(dateG: string) {
    let date = dateG.split('/')
    const newDay = ('00' + date[0]).slice(-2)
    const newMonth = ('00' + date[1]).slice(-2)
    const newYear = ('00' + date[2]).slice(-4)
    return `${newYear}-${newMonth}-${newDay}`
}