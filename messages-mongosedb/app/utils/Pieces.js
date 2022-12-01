
// const ValidTypeCheck = (value, type, length) => {
//     let bResult;
//     let minLength = 0;
//     if (length !== null && length !== undefined) {
//         minLength = length;
//     }
//     bResult = !(typeof value !== type && value == null || value.length <= minLength);
//     return bResult;
// }

// const typeOf=value=>Object.prototype.toString.call(value);
const typeOf=value=>Object.prototype.toString.call(value).slice(8,-1);
const ValidTypeCheck = (value, type,minLength, maxLength) => {
    let bResult;
    minLength = minLength||0;

    //bResult = (typeOf(value) === type && value !== null && value.toString().length >= minLength && (value.toString().length <= maxLength||!maxLength));
    bResult = (typeOf(value) === type && value !== null && value.length >= minLength && (value.length <= maxLength||!maxLength));
    return bResult;
}

const ValidObjectEnum = (value, object) => {
    let result = false;
    for (const properyName in object) {
        if (value === object[properyName]) {
            result = true;
            break;
        }
    }
    return result;
}
module.exports = {
    ValidTypeCheck,
    ValidObjectEnum
}