<template>
  <section class="details-wrapper main-layout">
    <section class="flex flex-column" v-if="meal && host">
      <div class="title bold">{{ meal.title }}</div>
      <div>
        <img class="star" src="@/assets/icons/star.svg" />
        <span class="rating-details">
          {{ host.host.rate }}/5 <span>(68 reviews)</span></span
        >
      </div>
      <div class="img-gallery">
        <img
          :src="require('@/assets/img/details/chef-details.jpg')"
          class="large-img"
        />
        <img
          :src="require('@/assets/img/details/thai3.jpg')"
          class="medium-img"
        />
        <img
          :src="require('@/assets/img/details/thai2.jpg')"
          class="small-img"
        />
        <img
          :src="require('@/assets/img/details/thai1.jpg')"
          class="small-img"
        />
      </div>
      <div>
        <img class="avatar" :src="require(`@/assets/img/chefs/${meal.host.imgUrl}.jpg`)" />
      </div>
      <div>
        Hosted by <span class="host-name bold">{{ host.fullname }}</span>
      </div>
      <div class="main-container">
        <details-content :meal="meal" :host="host"></details-content>
        <details-booking
          :meal="meal"
          :host="host"
          :user="user"
          @approveBooking="approveBooking"
        ></details-booking>
      </div>
      <div @click="toggleBookingModal" v-if="isBooking" class="dark-screen">
        <div class="booking-modal flex flex-column" v-if="isBooking">
          <div class="booking-modal-main flex">
           <div class="img-gallery-booking">
        <img :src="require('@/assets/img/details/chef-details.jpg')" class="img1-booking"/>
        <img :src="require('@/assets/img/details/thai3.jpg')" class="img2-booking"/>
        <img :src="require('@/assets/img/details/thai2.jpg')" class="img3-booking"/>
        <!-- <img :src="require('@/assets/img/details/thai1.jpg')" class="img4-booking"/> -->
        <img :src="require(`@/assets/img/previews/${meal.imgUrl}.jpg`)" class="img5-booking" />
      </div>
            <div class="booking-content flex flex-column space-between">
              <div>
              <h4>You're almost there!</h4>
              <h3 class="bold">{{ meal.title }}</h3>
              <div><span class="bold"></span>{{ eventTime }}</div>
              
              <div class="price-details">
              <div>${{ meal.price }} per person</div>
              <div>{{ order.guestsNum }} guests</div>
              <div><span class="bold">Total: </span>${{ totalPrice }}</div>
              </div>

              </div>
            <div class="btns">
              <button class="btn-book" @click.stop="saveOrder">Approve</button>
              <button class="btn-cancel" @click.stop="toggleBookingModal">Cancel</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="booking-modal booked" v-if="isOrderPlaced">
        <h3>Your order has been placed!</h3>
      </div>
    </section>

    <div v-else v-loading="loading"></div>
  </section>
</template>

<script>
import { NEWmealService } from "../services/NEW-meal-service.js";
import { NEWuserService } from "../services/NEW-user-service.js";
import detailsContent from "../cmps/details-content.vue";
import detailsBooking from "../cmps/details-booking.vue";

export default {
  data() {
    return {
      loading: true,
      meal: null,
      host: null,
      user: this.$store.getters.loggedinUser,
      isBooking: false,
      isOrderPlaced: false,
      order: {},
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

    eventTime(){
      const time = this.order.eventTime
      return time.toLocaleString('en-GB', { timeZone: 'UTC' })
    }
  },

  methods: {
    async saveOrder() {
      try {
        await this.$store.dispatch({ type: "saveOrder", order: this.order });
      this.toggleBookingModal()
        this.isOrderPlaced = !this.isOrderPlaced;
        setTimeout(() => {
          this.isOrderPlaced = !this.isOrderPlaced;
        }, 3000);

        this.updateGuests();
      } catch (err) {
        console.log("err in saveOrder", err);
      }
    },

    // --------------------------------
    async updateGuests() {
      // console.log(this.order);
      const updateGuests = {
        mealId: this.order.meal._id,
        guests: this.order.guestsNum,
      };
      try {
        await this.$store.dispatch({ type: "addGuests", updateGuests });
      } catch (err) {
        console.log("err in updateGuests", err);
      }
    },
    // --------------------------------

    async getMealAndUser() {
      try {
        const { mealId } = this.$route.params;
        const meal = await NEWmealService.getById(mealId);
        this.meal = JSON.parse(JSON.stringify(meal));
        const userId = this.meal.host._id;
        const user = await NEWuserService.getById(userId);
        this.host = JSON.parse(JSON.stringify(user));
        return;
      } catch (err) {
        console.log("err in getMealAndUser:", err);
      }
    },

    toggleBookingModal(){
      this.isBooking = !this.isBooking;
      console.log(this.isBooking)
    },

    approveBooking(order) {
      this.order = order;
      this.toggleBookingModal()
    },
  },

  created() {
    setTimeout(async () => {
      await this.getMealAndUser();
      socketService.emit("details-host", this.host._id);
    }, 1000);
  },

  components: {
    detailsContent,
    detailsBooking,
  },
};
</script>
