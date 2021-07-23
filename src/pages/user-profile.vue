<template>
  <section class="user-profile">
    <h2>
      <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
      Hi there! {{ user.username }}
    </h2>

    <article class="user-profile-options">
      <h3 @click="userOrders">User orders</h3>
      <h3 @click="userHost">Statistic</h3>

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
  },

  // --------------------------------------

  components: {
    userOrders,
    userHost,
  },
};
</script>

