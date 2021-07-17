const debounce = function (func, timer) {

    let timeId = null;

    return function (...args) {

        if (timeId) {
            clearTimeout(timeId)
        }
        const that = this
        timeId = setTimeout(function () {
            func.apply(that, args)
        }, timer)
    }

}
export { debounce }