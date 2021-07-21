import { mealService } from '../../services/meal-service.js'
import { NEWmealService } from '../../services/NEW-meal-service.js'

export default {
    state: {
        meals: [],
        filterBy: { diet: 'all', price: null, guests: {}, cuisine: '' },
    },

    // ---------------------------------

    getters: {
        getFilter(state) {
            return state.filterBy
        },
        mealsToShowHomepage(state) {
            // var meals=[]
            var mealsToShowHomepage = state.meals.sort((a, b) => {
                return a.host.rate > b.host.rate ? -1 : a.host.rate < b.host.rate ? 1 : 0
            })
            mealsToShowHomepage = mealsToShowHomepage.slice(0, 24)
            // return state.meals.filter(meal => meal.owner.rate > 4)
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
               console.log('savedMealsavedMeal',savedMeal);
               commit({ type:'addMeal', savedMeal })
               return savedMeal
            }
            catch (err){
               console.log('Cannot save meal ', meal, ',', err);
               throw err;
            }
         },
    },
}