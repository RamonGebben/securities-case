
/**
 * Intersperse a separator between each element of an array.
 * @method intersperse
 * @param  {array}    arr collection of components
 * @param  {string}    sep separator you want to drop in between
 * @return {array}        updated array with the separator between the items
 */
function intersperse(arr, sep) {
    if (arr.length === 0) return [];

    return arr.slice(1).reduce((xs, x, i) => {
        return xs.concat([sep, x]);
    }, [arr[0]]);
}

export default intersperse;
