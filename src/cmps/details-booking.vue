<template>
  <div class="booking-container">
    <div class="flex booking-top">
      <div class="price flex">
        <h1 class="bold price-booking">${{ meal.price }}</h1>
        <span class="price-detail">/person </span>
      </div>
      <div class="rating">
        <img class="star" src="@/assets/icons/star.svg" />
        <span class="rating-details">
          {{ host.host.rate }}/5 <span>(68 reviews)</span></span
        >
      </div>
    </div>
    <div class="booking-bottom">
      <form class="flex flex-column" action="" @submit.prevent>
        <div class="date-container flex flex-column">
          <div class="calendar">
            <!-- -----------------------------------------------DATE: -->

            <!-- <article class="inline"> -->
              <!-- <span class="demonstration"></span> -->
              <el-date-picker
                v-model="order.eventTime"
                type="date"
                placeholder="Pick a date"
                default-value="2021-07-15"
              >
              </el-date-picker>
            <!-- </article> -->
          </div>
        </div>

        <el-select
          v-model="order.guestsNum"
          placeholder="Guests"
        >
          <el-option
            v-for="item in guestOptions"
            :key="item.idx"
            :label="item.label"
            :value="item.idx"
          >
          </el-option>
        </el-select>
        <div class="booking-price">
          <span>Total: </span>
          <span>${{ totalPrice }}</span>
        </div>
        <button class="btn-book" @click="approveBooking">Book my seats</button>
      </form>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    meal: Object,
    host: Object,
    user: Object,
  },

  data() {
    return {
      order: {
        guestsNum: "",
        eventTime: null,
        createdAt: Date.now(),
        totalPrice: null,
        status: "pending",
      },

      isBooking: false,
      // --------------------------------
      date: "", // @@
      // --------------------------------
      guestOptions: [
        {
          idx: 1,
          label: "1 - guest",
        },
        {
          idx: 2,
          label: "2 - guests",
        },
        {
          idx: 3,
          label: "3 - guests",
        },
        {
          idx: 4,
          label: "4 - guests",
        },
        {
          idx: 5,
          label: "5 - guests",
        },
        {
          idx: 6,
          label: "6 - guests",
        },
        {
          idx: 7,
          label: "7 - guests",
        },
        {
          idx: 8,
          label: "8 - guests",
        },
      ],
      guests: "",
      // --------------------------------
    };
  },

  methods: {
    createOrder() {
      this.order.buyer = {
        _id: this.user._id,
        fullname: this.user.fullname,
        imgUrl: this.user.imgUrl,
      };
      this.order.meal = {
        _id: this.meal._id,
        title: this.meal.title,
        capacity: this.meal.capacity,
      };
      this.order.host = {
        _id: this.host._id,
        fullname: this.host.fullname,
        imgUrl: this.host.imgUrl,
      };
    },
    approveBooking() {
      this.$emit("approveBooking", this.order);
    },
  },

  computed: {
    totalPrice() {
      const totalPrice = this.order.guestsNum * this.meal.price;
      this.order.totalPrice = totalPrice;
      return totalPrice;
    },
  },
  created() {
    this.createOrder();
  },
};
</script>
