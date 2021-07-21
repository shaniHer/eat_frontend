<template>
  <section class="main-layout">
    <div class="add-meal-container flex">
    <form class="meal-details"@submit.prevent="saveMeal" v-if="meal">
      <h2 class="page-title">Create new event</h2>
      <div class="flex space-between"><label>Event title</label>
      <input type="text" v-model="meal.title" /></div>
      <div class="flex space-between"><label>A word about hte experience</label>
      <input type="text" v-model="meal.desc" /></div>
      <div class="flex space-between"><label>Price per person</label>
      <input type="number" v-model="meal.price" /> </div>
      <div class="flex space-between"><label>Capacity</label>
      <input type="number" v-model.number="meal.capacity" /></div>
      <div class="flex space-between"><label>Vegeterian</label>
      <input type="checkbox" v-model="meal.vegeterian" /> </div>
      <div class="flex space-between"><label>Vegan</label>
      <input type="checkbox" v-model="meal.vegan" /> </div>
      <div class="flex space-between"><label>Cuisine</label>
      <select v-model="meal.cuisine">
        <option value="Thai">Thai</option>
        <option value="Asian">Asian</option>
        <option value="American">American</option>
        <option value="Czechoslovak">Czechoslovak</option>
      </select></div>
      <div class="flex space-between"><label>Upload Images</label></div>
      <button class="btn-save">Save</button>
    </form>
    <div class="img-gallery-add">
        <div class="add-img large-img"> Add image</div>
        <div class="add-img medium-img">Add image </div>
        <div class="add-img small-img">Add image</div>
        <div class="add-img small-img">Add image</div>
        <!-- <img
          :src="require('@/assets/img/chef-details.jpg')"
          class="large-img"
        />
        <img :src="require('@/assets/img/meal.jpg')" class="medium-img" />
        <img :src="require('@/assets/img/pizza.jpg')" class="small-img" />
        <img :src="require('@/assets/img/plates.jpg')" class="small-img" /> -->
      </div>
    </div>
  </section>
</template>

<script>
import {NEWmealService} from '@/services/NEW-meal-service.js'

export default {

  data() {
    return {
      meal: {},
      isDetails: true,
      isGallery: true
    };
  },

  created() {
      this.createMeal();  
  },
  methods: {
    async saveMeal() {
      try {
        await this.$store.dispatch({ type: "saveMeal", meal: this.meal });
        this.meal = NEWmealService.getEmptyMeal()
        // this.$router.push('/meal/')
      } catch (err) {
        console.log("cannot save meal", err);
      }
    },


    async createMeal(){
        try{
            const emptyMeal =await NEWmealService.getEmptyMeal()
            this.meal = emptyMeal
            const {_id,host,fullname,imgUrl} = await this.$store.getters.loggedinUser
                this.meal.host={
                    _id:_id,
                    rate:host.rate,
                    fullname: fullname,
                    imgUrl: imgUrl
                }
        } catch(err){
            console.log("err  in createMeal", err);

        }
    },
    
  }

  
}
</script>