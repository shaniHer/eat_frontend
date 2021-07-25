import { mealService } from '../../services/meal-service.js'
import { NEWmealService } from '../../services/NEW-meal-service.js'

export default {
    state: {
        meals: [],
        filterBy: { diet: 'all', price: null, guests: {}, cuisine: '', txt: '' },
    },

    // ---------------------------------

    getters: {
        getFilter(state) {
            return state.filterBy
        },
        mealsToShowHomepage(state) {
            var mealsToShowHomepage = state.meals.sort((a, b) => {
                return b.host.rate - a.host.rate
            })
            mealsToShowHomepage = mealsToShowHomepage.slice(0, 4)
            return mealsToShowHomepage
        },
        mealsToShowCuisine(state) {
            var meals = []
            meals = state.meals.filter(meal => meal.cuisine === state.filterBy.cuisine)
            return meals
        },

        getMeals(state) {
            var meals = []

            if (state.filterBy.diet === 'all') meals = state.meals
            else meals = state.meals.filter(meal => meal[state.filterBy.diet])

            if (state.filterBy.guests.max) {
                meals = meals.filter(meal => meal.guests <= state.filterBy.guests.max)
            }

            if (state.filterBy.price) {
                meals = meals.filter(meal => meal.price > state.filterBy.price[0] && meal.price < state.filterBy.price[1])
            }

            if (state.filterBy.cuisine) {
                meals = meals.filter(meal => meal.cuisine.toLowerCase() === state.filterBy.cuisine)
            } else if (state.filterBy.cuisine === 'all') {
                state.filterBy.cuisine = ''
            }
            const regex = new RegExp(state.filterBy.txt, 'i')
            // meals = meals.filter(meal => regex.test(meal.title))
            meals = meals.filter(meal => regex.test(meal.loc.name)||regex.test(meal.title))
            return meals
        }
    },

    // ---------------------------------

    mutations: {
        setMeals(state, { meals }) {
            state.meals = meals
        },

        setFilter(state, { filter }) {
            state.filterBy = filter
        },

        addMeal(state, { savedMeal }) {
            state.meals.push(savedMeal);
        },

        addGuests(state, { meal }) {
            const updateMeal = state.meals.find(m => m._id === meal._id)
            updateMeal.guests = meal.guests
        },



    },

    // ---------------------------------

    actions: {
        async loadMeals(context) {
            try {
                const meals = await NEWmealService.query()
                context.commit({ type: 'setMeals', meals })
                return meals//*** */
            } catch (err) {
                console.log('err in getMeals function:', err)
                throw err
            }
        },

        async saveMeal({ commit }, { meal }) {
            // const type = (meal._id) ? 'updateMeal' : 'addMeal'
            try {
                const savedMeal = await NEWmealService.add(meal)
                commit({ type: 'addMeal', savedMeal })
                return savedMeal
            }
            catch (err) {
                console.log('Cannot save meal ', meal, ',', err);
                throw err;
            }
        },

        async addGuests({ commit }, { updateGuests }) {
            // const type = (meal._id) ? 'updateMeal' : 'addMeal'
            try {
                const meal = await NEWmealService.update(updateGuests)
                commit({ type: 'addGuests', meal })
            }
            catch (err) {
                // console.log('Cannot save meal ', meal, ',', err);
                throw err;
            }
        },

    },


}