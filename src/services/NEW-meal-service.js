
import { httpService } from "./http.service.js";



export const NEWmealService = {
    query,
    getById,
    remove,
    add,
    getEmptyMeal,
    update,

}


function query() {
    return httpService.get('meal')
}

function getById(id) {
    return httpService.get(`meal/${id}`)
}

function remove(id) {
    return httpService.delete(`meal/${id}`)
}

function add(meal) {
    return httpService.post('meal', meal)
}

function update(updateGuests) {
    return httpService.put('meal', updateGuests)
}

function getEmptyMeal() {
    return {
        title: '',
        price: 0,
        capacity: 0,
        vegeterian: false,
        vegan: false,
        desc: '',
        guests: 0,
        cuisine: null,
        imgUrl: "https://static.wixstatic.com/media/2ef66c_fe6f63c8d05543dba5f6d385e06f9fec~mv2.jpg/v1/fill/w_730,h_410,al_c,q_90/2ef66c_fe6f63c8d05543dba5f6d385e06f9fec~mv2.jpg",
        loc: {
            name: "Paris",
            lat: 32.9898,
            lng: 12.28
        },
    }
}



