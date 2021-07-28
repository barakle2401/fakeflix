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
//return 12/11/2012 format
const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-US")
}
export { debounce, formatDate }