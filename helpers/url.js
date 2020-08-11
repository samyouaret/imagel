
module.exports = {
    urlencode(object) {
        let string = "";
        for (const key in object) {
            string += key + '=' + object[key] + "&";
        }
        return string.slice(0, -1);
    },
    urldecode(string) {
        let pairArray = string.split('&');
        let object = {};
        for (let index = 0; index < pairArray.length; index++) {
            let [key, value] = pairArray[index].split('=');
            object[key] = value;
        }
        return object;
    },
}