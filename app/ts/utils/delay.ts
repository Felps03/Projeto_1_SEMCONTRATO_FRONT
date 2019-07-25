export function delay(val: any, delay: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val)
        }, delay)
    })
}

function delayHelp(callback: any, ms: any) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, ms || 0);
    };
  }