const debounce = function (func, timer) {

    let timeId = null;

    return (...args) => {

        if (timeId) {
            clearTimeout(timeId)
        }

        timeId = setTimeout(() => {
            func(...args)
        }, timer)
    }

}
export { debounce }