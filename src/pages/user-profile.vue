<template>
  <section class="main-layout user-profile">
    <!-- <chat-room :user="user"></chat-room> -->

    <h2 class="welcome-msg">
      <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
      Hi there! {{ user.username }}
    </h2>

    <article class="user-profile-options">
      <el-button @click="userOrders">User orders</el-button>
      <el-button @click="userHost">Statistic</el-button>

      <user-orders
        v-if="show.orders"
        :orders="orders"
        :logdinUser="user"
      ></user-orders>

      <user-host
        v-if="show.host"
        :orders="orders"
        :meals="meals"
        :logdinUser="user"
      ></user-host>
    </article>
  </section>
</template>

<script>
import userOrders from "../cmps/user-orders.vue";
import userHost from "../cmps/user-host.vue";

import chatRoom from "../cmps/chat-room.vue";

export default {
  data() {
    return {
      user: null,
      orders: [],
      meals: [],
      show: { orders: true, host: false },
    };
  },

  computed: {},

  // --------------------------------------

  methods: {
    userOrders() {
      this.show.orders = !this.show.orders;
      if (this.show.host) this.show.host = false;
      if (!this.show.orders && !this.show.host) this.show.orders = true;
    },
    userHost() {
      this.show.host = !this.show.host;
      if (this.show.orders) this.show.orders = false;
      if (!this.show.host && !this.show.orders) this.show.host = true;
    },
  },

  // --------------------------------------

  created() {
    this.$store.dispatch({ type: "loadOrders" });

    this.user = this.$store.getters.loggedinUser;
    this.meals = this.$store.getters.getMeals;
    this.orders = this.$store.getters.orders;
    console.log("this.ordersthis.orders", this.orders);
    console.log("this.mealsthis.meals", this.meals);
  },

  // --------------------------------------

  components: {
    userOrders,
    userHost,
    chatRoom,
  },
};
</script>

