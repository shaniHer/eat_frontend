import Vue from 'vue'
import VueRouter from 'vue-router'

import homePage from '@/pages/home-page.vue'
import mealApp from '@/pages/meal-app.vue'
import mealDetails from '@/pages/meal-details.vue'
import userProfile from '@/pages/user-profile.vue'
import mealAdd from '@/pages/meal-add.vue'
// import chat from '@/pages/chat.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage,
  },
  {
    path: '/meal-app/:meals?',//@@
    // path: '/meal-app',
    name: 'mealApp',
    component: mealApp
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: userProfile
  },
  {
    path: '/meal/:mealId',
    name: 'mealDetails',
    component: mealDetails

  },
  {
    path: '/meal-add',
    name: 'mealAdd',
    component: mealAdd

  },
  // {
  //   path: '/chat',
  //   name: 'chat',
  //   component: chat

  // },

]

const router = new VueRouter({
  routes
})

export default router
