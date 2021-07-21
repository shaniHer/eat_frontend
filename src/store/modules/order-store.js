import { orderService } from '../../services/order-service.js'
import { NEWorderService } from '../../services/NEW-order-service.js'

export default {
    state: {
        orders: [],
    },

    getters: {
        orders(state) {
            return state.orders
        },

    },

    mutations: {
        updateOrder(state, { order }) {
            var idx = state.orders.findIndex(currOrder => currOrder._id === order._id)
            state.orders.splice(idx, 1, order)
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },

        setOrders(state, { orders }) {
            state.orders = orders
        },

        setUserOrders(state, { user }) {
            console.log('useruser', user);
            console.log('state.orders', state.orders);
        }

    },

    actions: {
        async saveOrder({ commit }, payload) {
            try {
                const type = (payload.order._id) ? 'updateOrder' : 'addOrder';
                // const savedOrder = await orderService.save(payload.order)
                const savedOrder = await NEWorderService.add(payload.order)
                commit({ type: type, order: payload.order })
                return savedOrder

            } catch (err) {
                console.log('canntot save order', payload.order, err)
                throw err
            }
        },

        async loadOrders({ commit }) {
            try {
                const orders = await NEWorderService.query()
                commit({ type: 'setOrders', orders })
                return orders
            } catch (err) {
                console.log('err in loadOrders function:', err)
                throw err
            }
        },


    }
}