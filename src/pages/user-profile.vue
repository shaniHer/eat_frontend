<template>
  <section class="user-profile">
    <h2>
      <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
      Hi there! {{ user.username }}
    </h2>

    <article class="user-profile-options">
      <h3 @click="userOrders">Your orders</h3>
      <h3 @click="userHost">Your host</h3>


      <user-orders
        v-if="show.orders"
        :orders="orders"
        :logdinUser="user"
      ></user-orders>

      <user-host v-if="show.host" :logdinUser="user"></user-host>
      <!-- -=------------------------------------------ -->
    </article>
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
import userHost from "../cmps/user-host.vue";

export default {
  data() {
    return {
      user: null,
      orders: [],
      meals: [],
      show: { orders: true, host: false },
    };
  },

  computed: {
    // ordersToShow() {
    //   return this.orders.filter((order) => order.buyer._id === this.user._id);
    // },
  },

  // --------------------------------------

  methods: {
    userOrders() {
      this.show.orders = !this.show.orders;
      if(this.show.host) this.show.host = false
    },
    userHost() {
      this.show.host = !this.show.host;
        if(this.show.orders) this.show.orders = false
    },
  },

  // --------------------------------------

  created() {
    this.$store.dispatch({ type: "loadOrders" });
    this.user = this.$store.getters.loggedinUser;
    this.orders = this.$store.getters.orders;
  },

  // --------------------------------------

  components: {
    userOrders,
    userHost,
  },
};
</script>

