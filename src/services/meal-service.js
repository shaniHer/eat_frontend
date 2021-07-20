import { asyncStorageService } from "./async-storage-service.js"
import { util } from "../services/util.js"

export const mealService = {
    query,
    remove,
    add,
    update,
    getById
}

const STORAGE_KEY = 'meal'


function query() {
    if (!util.loadFromStorage(STORAGE_KEY) || !util.loadFromStorage(STORAGE_KEY).length) {
        createMeals()
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

function add(todo) {
    return asyncStorageService.post(STORAGE_KEY, todo)
}

function update(todo) {
    return asyncStorageService.put(STORAGE_KEY, todo)
}

function getEmptyMeal(){
    return {
        title,
        price: util.getRndInteger(150, 500),
        capacity: 12,
        vegeterian: util.randomBuliean(),
        vegan: util.randomBuliean(),
        diet: util.randomBuliean(),
        guests: util.getRndInteger(1, 25),
        cuisine,
        mealImgUrl: util.getMealImgUrl(cuisine),
        host: {
            _id: id,
            rate,
            fullname,
            imgUrl,
        },
        loc: {
            name: "Paris",
            lat: 32.9898,
            lng: 12.28
        },

    }
}

function createMeals() {
    const meals = [
        createMeal('A Garden Party Under The Stars', 'u101', 'Jake Jackobson', 'asian', 4, 1),
        createMeal('A Gastronomic Dinner with a MasterChef', 'u102', 'Chef Chekovski', 'asian', 5, 2),
        createMeal('Friendly Asian dinner', 'u103', 'Dina Cookingson', 'asian', 2, 3),
        createMeal('Czechoslovak organic dinner in retro atmosphere', 'u104', 'Sing Songmeal', 'asian', 4, 4),
        createMeal('Asian Vegan Dinner', 'u101', 'Jake Jackobson', 'asian', 4, 5),
        createMeal('Authentic Asian', 'u102', 'Chef Chekovski', 'asian', 5, 6),
        createMeal('Fine Dining Taster Menu', 'u103', 'Dina Cookingson', 'american', 2, 7),
        createMeal('A Garden Party Under The Stars', 'u104', 'Sing Songmeal', 'thai', 1, 8),
        createMeal('An Asian feast for food lovers', 'u101', 'Jake Jackobson', 'asian', 3, 5),
        createMeal('An introduction to Thai cuisine', 'u102', 'Chef Chekovski', 'thai', 3, 5),
        createMeal('Authentic Chinese Dumpling', 'u103', 'Dina Cookingson', 'asian', 3, 5),
        createMeal('A dinner through America\'s best dishes', 'u104', 'Sing Songmeal', 'american', 3, 5),
        createMeal('Czechoslovak lunch under the trees', 'u101', 'Jake Jackobson', 'czechoslovak', 3, 5),
        createMeal('Delicious Thai - Traditional thai family dinner', 'u102', 'Chef Chekovski', 'thai', 3, 5),
        createMeal('Homegrown Czechoslovak dinner near Split', 'u103', 'Dina Cookingson', 'czechoslovak', 3, 5),
        createMeal('American Pop-Up Supper Club', 'u104', 'Sing Songmeal', 'american', 3, 5),
        createMeal('Gourmet brunch in charming Santa Fe', 'u101', 'Jake Jackobson', 'czechoslovak', 3, 5),
        createMeal('Rooftop seafood dinner', 'u102', 'Chef Chekovski', 'thai', 3, 5),
        createMeal('The essential Czechoslovak dinner', 'u103', 'Dina Cookingson', 'czechoslovak', 3, 5),
        createMeal('Thai sunday Dinner', 'u104', 'Sing Songmeal', 'thai', 3, 5),
    ]
    util.saveToStorage(STORAGE_KEY, meals)
}

function createMeal(title, id, fullname, cuisine, rate, imgUrl) {
    const meal = {
        _id: util.makeId(),
        title,
        price: util.getRndInteger(150, 500),
        capacity: 12,
        vegeterian: util.randomBuliean(),
        vegan: util.randomBuliean(),
        diet: util.randomBuliean(),
        guests: util.getRndInteger(1, 25),
        cuisine,
        mealImgUrl: util.getMealImgUrl(cuisine),
        host: {
            _id: id,
            rate,
            fullname,
            imgUrl,
        },
        loc: {
            name: "Paris",
            lat: 32.9898,
            lng: 12.28
        },

    }
    return meal
}
