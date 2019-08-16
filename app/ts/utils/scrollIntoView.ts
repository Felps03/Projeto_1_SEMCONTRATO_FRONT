// the default scrolls even if the element is already in sight
// https://stackoverflow.com/a/7557433
export function isElementInViewport(el: HTMLElement) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

export function scrollIntoViewIfNotInView(el: HTMLElement) {
    if (!isElementInViewport(el)) {
        el.scrollIntoView()
    }
}