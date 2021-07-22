<template>
  <section class="details-wrapper main-layout">
    <section class="flex flex-column" v-if="meal && host">
      <div class="img-gallery">
        <img
          :src="require('@/assets/img/chef-details.jpg')"
          class="large-img"
        />
        <img :src="require('@/assets/img/meal.jpg')" class="medium-img" />
        <img :src="require('@/assets/img/pizza.jpg')" class="small-img" />
        <img :src="require('@/assets/img/plates.jpg')" class="small-img" />
      </div>
      <div class="main-container">
        <details-content :meal="meal" :host="host"></details-content>
        <details-booking :meal="meal" :host="host" :user="user" 
        @approveBooking="approveBooking"></details-booking>
      </div>
      <div @click="closeModal" v-if="isBooking" class="dark-screen">
        <div class="booking-modal flex flex-column" v-if="isBooking">
          <div class="booking-content">
            <div class="img">
              <img :src="require('@/assets/img/seafood/louis-hansel.jpg')" />
            </div>
            <div class="content">
              <h4>You're almost there!</h4>
              <h3 class="bold">{{ meal.title }}</h3>
              <div><span class="bold"></span>{{ order.eventTime }}</div>
              <div>${{ meal.price }} per person</div>
              <div>{{ order.guestsNum }} guests</div>
              <div><span class="bold">Total: </span>${{ totalPrice }}</div>
            </div>
          </div>
          <div class="btns">
            <button class="btn-book" @click="saveOrder">Approve</button>
            <button class="btn-cancel" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
      <div class="booking-modal booked" v-if="isOrderPlaced">
        <h3>Your order has been placed!</h3>
      </div>
    </section>
  </section>
</template>

<script>
import { NEWmealService } from "../services/NEW-meal-service.js";
import { NEWuserService } from "../services/NEW-user-service.js";
import detailsContent from '../cmps/details-content.vue'
import detailsBooking from '../cmps/details-booking.vue'
export default {
  data() {
    return {
      meal: null,
      host: null,
      user: this.$store.getters.loggedinUser,
      isBooking: false,
      isOrderPlaced: false,
      order:{}
      
    };
  },

  computed: {
    userImg() {
      return this.user.imgUrl;
    },

    mealImg() {
      return this.meal.mealImgUrl;
    },

    totalPrice() {
      const totalPrice = this.order.guestsNum * this.meal.price;
      this.order.totalPrice = totalPrice;
      return totalPrice;
    },
  },

  methods: {

    saveOrder() {
      this.$store.dispatch({ type: "saveOrder", order: this.order });
      this.isBooking = !this.isBooking;
      this.isOrderPlaced = !this.isOrderPlaced;
      setTimeout(() => {
        this.isOrderPlaced = !this.isOrderPlaced;
      }, 3000);
    },

    async getMealAndUser() {
      try {
        const { mealId } = this.$route.params;
        const meal = await NEWmealService.getById(mealId);
        this.meal = JSON.parse(JSON.stringify(meal));
        const userId = this.meal.host._id;
        const user = await NEWuserService.getById(userId);
        this.host = JSON.parse(JSON.stringify(user));
        console.log(this.host.reviews)
      } catch (err) {
        console.log("err in getMealAndUser:", err);
      }
    },

    closeModal(){
      this.isBooking = !this.isBooking;
    },

    approveBooking(order) {
      this.order = order
      this.isBooking = !this.isBooking;
    },
  },

  created() {
    this.getMealAndUser();
  },

  components:{
    detailsContent,
    detailsBooking
  }
};
</script>
