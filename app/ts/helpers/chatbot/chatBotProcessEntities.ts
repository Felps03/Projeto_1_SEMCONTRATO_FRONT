export function date(name: string) {
    return (state: Map<string, string>, match: RegExpExecArray) => {
        const currentYearS = '' + new Date().getFullYear()
        const currentYear = +currentYearS
        const currentYearLength = currentYearS.length

        const [_, dayS, monthS, yearS] = match
        const yearLength = yearS.length

        // in 2015:
        // 4 = 2014, 6 = 2006
        // 13 = 2013, 17 = 1917
        // 011 = 2011, 019 = 1019
        let finalYearS

        if (yearLength < currentYearLength) {
            const year = +yearS
            const yearModulo = 10 ** yearLength

            if (year % yearModulo <= currentYear % yearModulo) {
                finalYearS =
                    currentYearS.substring(0, currentYearLength - yearLength) +
                    yearS
            } else {
                const tmp = +currentYearS.substring(
                    0,
                    currentYearLength - yearLength
                )
                finalYearS = '' + (tmp - 1) + yearS
            }
        } else {
            finalYearS = yearS
        }

        state.set(name,
            `${finalYearS}-${('00' + monthS).slice(-2)}-${(('00' + dayS).slice(-2))}`
        )
    }
}

export function raw(name: string, idx: number = 1) {
    return (state: Map<string, string>, match: RegExpExecArray) => {
        state.set(name, match[idx])
    }
}
