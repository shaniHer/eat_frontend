import { asyncStorageService } from "./async-storage-service.js"
import { util } from "../services/util.js"

export const userService = {
    query,
    remove,
    add,
    update,
    getById
}

const STORAGE_KEY = 'user'
_createUsers()

function query() {
    if (!util.loadFromStorage(STORAGE_KEY)) {
        _createUsers()
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

function add(user) {
    return asyncStorageService.post(STORAGE_KEY, user)
}

function update(user) {
    return asyncStorageService.put(STORAGE_KEY, user)
}

function _createUsers() {
    const users = [
        createUser('Jake Jackobson', 'u101'),
        createUser('Chef Chekovski', 'u102'),
        createUser('Dina Cookingson', 'u103'),
        createUser('Sing Songmeal', 'u104')
    ]
    util.saveToStorage(STORAGE_KEY, users)
}

function createUser(fullname, id) {
    const user = {
        _id: id,
        fullname,
        imgUrl: "@/assets/img/img1.jpg",
        username: "user1",
        password: "secret",
        host: {
            desc: "mamash ahla hanot organit",
            rate: 4,
            reviews: [
                {
                    id: "madeId",
                    txt: "A great place to dine..",
                    rate: 4,
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                },
                {
                    id: "madeId",
                    txt: "Amazing experience!..",
                    rate: 4,
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                },
                {
                    id: "madeId",
                    txt: "Could have been better!..",
                    rate: 4,
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                },
                {
                    id: "madeId",
                    txt: "Amazing experience!..",
                    rate: 4,
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                },
                {
                    id: "madeId",
                    txt: "one of the greatest meals ever!!..",
                    rate: 4,
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                },
                {
                    id: "madeId",
                    txt: "Didn't have much fun..",
                    rate: 4,
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                },
            ]
        }
    }
    return user
}