import Vue from 'vue'
import Vuex from 'vuex'
import mealStore from './modules/meal-store.js';
import userStore from './modules/user-store.js';
import orderStore from './modules/order-store.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userMsg:null
    },
    getters:{
        userMsg(state){
            return state.userMsg
        }
    },
    mutations: {
        updateUserMsg(state, { userMsg }) {
            console.log(userMsg);
            state.userMsg = userMsg;
          },
          deleteMsg(state) {
            state.userMsg = null
          }
    },
    actions: {
        setUserMsg({ commit }, { userMsg }) {
            commit({ type: "updateUserMsg", userMsg });
            setTimeout(() => {
              commit({ type: "deleteMsg" });
            }, 2000);
          }
    },
    modules: {
        mealStore,
        userStore,
        orderStore
    }
})
