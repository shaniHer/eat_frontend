// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const SCORE_FOR_REVIEW = 10
// var gWatchedUser = null;

export const NEWuserService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser
}

// window.userService = userService

// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

function getUsers() {
    return httpService.get(`user`)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    socketService.emit('login', user._id);
    if (user) return _saveLocalUser(user)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user;
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

(async () => {
    var user = getLoggedinUser()
   
    window.addEventListener('storage', async () => {
        if (!gWatchedUser) return;
        const freshUsers = await storageService.query('user')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return;
        if (gWatchedUser.score !== watchedUser.score) {
            console.log('Watched user score changed - localStorage updated from another browser')
            socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        }
        gWatchedUser = watchedUser
    })
})();


//socketService:

(async () => {
    var user = getLoggedinUser()
    if (user) socketService.emit('set-user-socket', user._id)
})();