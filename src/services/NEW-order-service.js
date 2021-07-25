// import { asyncService } from "./async-storage-service.js";
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


function query() {
    return httpService.get('order')
}

function getById(id) {
    return httpService.get(`order/${id}`)
}

function remove(id) {
    return httpService.delete(`order/${id}`)
}


function add(order) {
    return httpService.post('order', order)
}



