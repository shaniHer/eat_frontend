import { asyncService } from "./async-storage-service.js";
// import { mealService } from "./meal-service.js";

// import axios from "axios";
import { httpService } from "./http.service.js";

// const URL = 'meal/'


export const NEWmealService = {
    query,
    getById,
    remove,
    add,
}

// var KEY = 'meals'

function query() {
    return httpService.get('meal')
    // .then(res => res.data)
}

function getById(id) {
    return httpService.get(`meal/${id}`)

    // return asyncService.get(KEY, +id)
}

function remove(id) {
    return httpService.delete(`meal/${id}`)
}


function add(meal) {
    return httpService.post('meal', meal)
}

function update(meal) {
    return asyncService.put(KEY, meal)
}



