<template>
  <section class="user-profile">
    <h2>
      <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
      Hi there! {{ user.username }}
    </h2>

    <h3 class="centerTxt">Your orders:</h3>
    <user-orders :orders="orders" :logdinUser="user"></user-orders>


    <h3 class="centerTxt">Your host:</h3>
    <user-host :logdinUser="user"></user-host>
    <!-- -=------------------------------------------ -->

    <!-- <ul v-for="order in ordersToShow" :key="order._id"> -->
    <!-- <div class="order-item">
          <span>{{ order.createdAt }}</span>
          <span>{{ order.eventTime }}</span>
          <span>{{ order.guestsNum }}</span>
          <span>${{ order.totalPrice }}</span>
          <span>Accept</span>
        </div> -->
    <!-- </ul> -->
    <!-- </article> -->
  </section>
</template>

<script>
import userOrders from "../cmps/user-orders.vue";
import userHost from "../cmps/user-host.vue"

export default {
  data() {
    return {
      user: null,
      orders: [],
    };
  },

  computed: {
    // ordersToShow() {
    //   return this.orders.filter((order) => order.buyer._id === this.user._id);
    // },
  },

  // --------------------------------------

  methods: {},

  // --------------------------------------

  created() {
    this.$store.dispatch({ type: "loadOrders" });
    this.user = this.$store.getters.loggedinUser;
    this.orders = this.$store.getters.orders;
  },

  // --------------------------------------

  components: {
    userOrders,
    userHost
  },
};
</script>

