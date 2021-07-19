export const util = {
    getDate,
    getTime,
    makeId,
    getRndInteger,
    randomBuliean,
    loadFromStorage,
    saveToStorage,
    getMealImgUrl
}

function getDate() {
    var currentdate = new Date();
    var fullDate =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear();
    return fullDate;
}

function getTime() {
    var currentdate = new Date();
    var time =
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    return time;
}

function _randomColor() {
    const randomColor = ['blue', 'green', 'gray', 'pink', 'magenta', 'lightsalmon']
    let randomNum = _getRndInteger(0, 5)
    return randomColor[randomNum]
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function randomBuliean() {
    const num = getRndInteger(0, 4)
    if (num > 2) return true
    else return false
}

function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var data = JSON.parse(json)
    return data;
}

function saveToStorage(key, data) {
    var json = JSON.stringify(data);
    localStorage.setItem(key, json)
}

function getMealImgUrl(cuisine) {
    console.log('cuisine', cuisine);
    if (cuisine === 'asian') return "https://static.wixstatic.com/media/2ef66c_fe6f63c8d05543dba5f6d385e06f9fec~mv2.jpg/v1/fill/w_730,h_410,al_c,q_90/2ef66c_fe6f63c8d05543dba5f6d385e06f9fec~mv2.jpg"
    if (cuisine === 'american') return "https://hitrashmut.co.il/wp-content/uploads/2019/12/%D7%A1%D7%9E%D7%90%D7%A9-%D7%91%D7%95%D7%A8%D7%92%D7%A8-%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%93%D7%A0%D7%99%D7%90%D7%9C-%D7%9C%D7%99%D7%9C%D7%942-1024x683.jpg"
    if (cuisine === 'thai') return "http://cdn.cnn.com/cnnnext/dam/assets/151215114545-40-thai-food-27-som-tam-1.jpg"
    if (cuisine === 'czechoslovak') return "https://cf.bstatic.com/data/xphoto/1182x887/222/22281452.jpg?size=S"
}