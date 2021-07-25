// import { userService } from '../../services/user-service.js'
import { NEWuserService } from "../../services/NEW-user-service.js"

export default {

    state: {
        loggedinUser: NEWuserService.getLoggedinUser(),
        // users: [],
        // watchedUser: null
    },

    // ---------------------------------

    getters: {
        // users({ users }) { return users },
        // loggedinUser({ loggedinUser }) { return loggedinUser }
        loggedinUser(state) {
            return state.loggedinUser
        }
        // watchedUser({ watchedUser }) { return watchedUser }
    },
    // ---------------------------------

    mutations: {
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user;
            console.log('store', user);
        },
        // setWatchedUser(state, { user }) {
        //     state.watchedUser = user;
        // },       
        // setUsers(state, { users }) {
        //     state.users = users;
        // },
        // setUser(state, { user }) {
        //     state.loggedinUser = user;
        // },
        // removeUser(state, { userId }) {
        //     state.users = state.users.filter(user => user._id !== userId)
        // },
    },

    // ---------------------------------

    actions: {
        async signup({ commit }, { userCred }) {
            try {
                const user = await NEWuserService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }
        },

        async login({ commit }, { userCred }) {
            try {
                const user = await NEWuserService.login(userCred);
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },

        // async logout({ commit }) {
        //     try {
        //         const logout=await userService.logout()
        //         commit({ type: 'setLoggedinUser', user: null })
        //        return logout.msg
        //     } catch (err) {
        //         console.log('userStore: Error in logout', err)
        //         throw err
        //     }
        // },
        // async loadUsers({ commit }) {
        //     try {
        //         const users = await userService.getUsers();
        //         commit({ type: 'setUsers', users })
        //     } catch (err) {
        //         console.log('userStore: Error in loadUsers', err)
        //         throw err
        //     }
        // },        
        // async loadAndWatchUser({ commit }, { userId }) {
        //     try {
        //         const user = await userService.getById(userId);
        //         commit({ type: 'setWatchedUser', user })
        //         socketService.emit(SOCKET_EMIT_USER_WATCH, userId) 
        //         socketService.off(SOCKET_EVENT_USER_UPDATED)
        //         socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
        //             commit({ type: 'setWatchedUser', user })
        //         })
        //     } catch (err) {
        //         console.log('userStore: Error in loadAndWatchUser', err)
        //         throw err
        //     }
        // },
        // async removeUser({ commit }, { userId }) {
        //     try {
        //         await userService.remove(userId);
        //         commit({ type: 'removeUser', userId })
        //     } catch (err) {
        //         console.log('userStore: Error in removeUser', err)
        //         throw err
        //     }
        // },
        // async updateUser({ commit }, { user }) {
        //     try {
        //         user = await userService.update(user);
        //         commit({ type: 'setUser', user })
        //     } catch (err) {
        //         console.log('userStore: Error in updateUser', err)
        //         throw err
        //     }

        // }


    },
}