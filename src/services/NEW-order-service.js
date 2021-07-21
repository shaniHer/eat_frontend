import { asyncService } from "./async-storage-service.js";
// import { mealService } from "./order-service.js";

// import axios from "axios";
import { httpService } from "./http.service.js";

// const URL = 'order/'


export const NEWorderService = {
    query,
    getById,
    remove,
    add,
}

// var KEY = 'meals'

function query() {
    return httpService.get('order')
    // .then(res => res.data)
}

function getById(id) {
    return httpService.get(`order/${id}`)

    // return asyncService.get(KEY, +id)
}

function remove(id) {
    return httpService.delete(`order/${id}`)
}


function add(order) {
    return httpService.post('order', order)
}

function update(order) {
    return asyncService.put(KEY, order)
}



