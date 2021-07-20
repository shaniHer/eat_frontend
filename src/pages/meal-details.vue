<template>
  <section class="details-wrapper main-layout">
    <section class="flex flex-column" v-if="meal && user">
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
        <div class="details-container">
          <div class="title bold">{{ meal.title }}</div>
          <div class="subtitle">
            Hosted by <span class="host-name bold">{{ user.fullname }}</span>
          </div>
          <div class="summary">
            <!-- <h3>Experience in a nutshell</h3> -->
            <div class="summary-container"></div>
          </div>
          <div class="meal-desc">
            <p class="subtitle bold">A word about the experience</p>
            <!-- <p>{{ meal.description }}</p> -->
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>Saepe provident in ducimus odio obcaecati.</p>
            <p>Ducimus, itaque dolore debitis incidunt animi quo,</p>
            <p>dolor dolorum ut quaerat est officiis ea architecto unde?</p>
          </div>
          <!-- <div class="host-container light-border">
       
          <div class="host-desc">{{ user.host.desc }}</div>
        </div> -->
          <p class="meal-menu bold subtitle">Menu</p>
          <p>Starters</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>Main</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>Desert</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
          <div class="reviews-container">
            <p class="bold subtitle">Some of our guests reviews</p>
            <ul class="reviews-list">
              <li
                v-for="review in user.host.reviews"
                :key="review._id"
                class="review-card"
              >
                <div class="review-header flex">
                  <img
                    class="avatar"
                    :src="require('@/assets/img/img1.jpg')"
                    alt=""
                  />
                  <div class="details">
                    <span>user name</span>
                    <!-- <span>review date</span> -->
                    <div>rating stars</div>
                  </div>
                </div>
                <div class="review-body">
                  <p>{{ review.txt }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="booking-container">
          <div class="flex flex-column booking-top">
            <div class="price-avatar grid">
              <div class="price flex">
                <h1 class="bold price-booking">${{ meal.price }}</h1>
                <span class="price-detail"> Price per guest </span>
              </div>
              <div>
                <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
              </div>
            </div>
            <div class="starts">
              <span class="fa fa-star"></span>
            </div>
            <div>
              Rating <span class="rating">{{ user.host.rate }}</span>
              <!-- <v-row justify="center">
              <v-date-picker></v-date-picker>
                </v-row> -->
   <!-- getAStar(idx) {
            console.log(idx + ' ' + this.review.rating);
            if (this.review.rating < idx) return '☆'
            return '★';
        }, -->
        <!-- <span v-for="star in 5"  @click="saveRate(star)"  > {{getAStar(idx)}} </span> -->
 <!-- saveRate(idx) {
            console.log(idx);
            this.review.rating = idx;
        } -->


              <span>&#9733;</span>
              <span>&#9734;</span>
            </div>
          </div>
          <div class="booking-bottom">
            <form class="flex flex-column" action="">
              <div class="date-container flex flex-column">
                <div class="calendar">
                  <div>
                    <label class="label-input" for="">Date</label>
                  </div>
                  <div class="input">
                    Select a date
                    <input
                      type="date"
                      v-model="order.eventTime"
                      aria-hidden=""
                    />
                  </div>
                </div>
                <!-- <div class="next-date">
                  <p>Next avilable dates</p>
                  <div class="btns-dates flex">
                        <button>Date1</button>
                        <button>Date2</button>
                        <button>Date3</button>
                  </div>
                </div> -->
              </div>
              <div class="select-guests">
                <label class="">Number of guests</label>
                <div class="input">
                  <input type="number" v-model="order.guestsNum" />
                </div>
              </div>
              <button class="btn-book" @click="toggleIsBooking">
                Book my seats
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
      <div @click="toggleIsBooking" v-if="isBooking" class="dark-screen">
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
            <button class="btn-cancel" @click="toggleIsBooking">Cancel</button>
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
export default {
  data() {
    return {
      meal: null,
      user: null,
      isBooking: false,
      isOrderPlaced: false,
      order: {
        _id: null,
        guestsNum: 0,
        eventTime: null,
        createdAt: Date.now(),
        totalPrice: null,
        status: "pending",
      },
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
    toggleIsBooking() {
      this.isBooking = !this.isBooking;
    },

    createOrder(currMeal, currUser) {
      const buyer = {
        _id: "u1001",
        fullname: "user userson",
        imgUrl: "",
      };
      this.order.buyer = buyer;
      const meal = {
        _id: currMeal._id,
        title: currMeal.title,
        capacity: currMeal.capacity,
      };
      this.order.meal = meal;
      const host = {
        _id: currUser._id,
        fullname: currUser.fullname,
        imgUrl: currUser.imgUrl,
      };
      this.order.host = host;
    },

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
        console.log(user)
        this.user = JSON.parse(JSON.stringify(user));
        this.createOrder(meal, user);
      } catch (err) {
        console.log("err in getMealAndUser:", err);
      }
    },
  },

  created() {
    this.getMealAndUser();
  },
};
</script>
