export function delay(val: any, delay: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val)
        }, delay)
    })
}