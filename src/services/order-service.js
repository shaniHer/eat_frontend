import { asyncStorageService } from "./async-storage-service.js"
import { util } from "../services/util.js"

export const orderService = {
    query,
    remove,
    save,
    getById
}

const STORAGE_KEY = 'order'


function query() {
    if (!util.loadFromStorage(STORAGE_KEY) || !util.loadFromStorage(STORAGE_KEY).length) {
        createOrders()
        return asyncStorageService.query(STORAGE_KEY)
    }
    return asyncStorageService.query(STORAGE_KEY)
}

function getById(id) {
    return asyncStorageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return asyncStorageService.remove(STORAGE_KEY, id)
}

function save(order) {
    if (order._id) {
        return asyncStorageService.put(STORAGE_KEY, order)
    }
    else {
        return asyncStorageService.post(STORAGE_KEY, order)
    }
}

function createOrders() {
    const orders = [
        createOrder('Yalla', 'u101', 'asian', 4, 1),
        createOrder('kvar', 'u102', 'asian', 5, 2),
        createOrder('Boao', 'u103', 'asian', 2, 3),
        createOrder('Nl', 'u104', 'asian', 4, 4),
        createOrder('Moshe', 'u105', 'asian', 4, 5),
        createOrder('Yossi', 'u106', 'asian', 5, 6),
        createOrder('Nal', 'u107', 'american', 2, 7),
        createOrder('Nat', 'u108', 'thai', 1, 8),
        createOrder('Yalla', 'u101', 'czechoslovak'),
    ]
    util.saveToStorage(STORAGE_KEY, orders)
}

function createOrder(title, id, cuisine, rate, imgUrl) {
    const order = {
        _id: util.makeId(),
        title,
        price: util.getRndInteger(5, 1500),
        vegeterian: util.randomBuliean(),
        vegan: util.randomBuliean(),
        diet: util.randomBuliean(),
        guests: util.getRndInteger(1, 25),
        cuisine,
        host: {
            _id: id,
            rate,
            fullname: "Dudu Da",
            imgUrl,
        },
        loc: {
            name: "Paris",
            lat: 32.9898,
            lng: 12.28
        },
    }
    return order
}
