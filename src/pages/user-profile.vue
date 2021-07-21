<template>
  <section>
    <h2>
      <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
      Hi there! {{ user.username }}
    </h2>
    <ul v-for="order in orders" :key="order._id">
      <div class="order-item">
        <span>{{ order.meal.title }}</span>
        <span>{{ order.eventTime }}</span>
        <span>{{ order.guestsNum }}</span>
        <span>${{ order.totalPrice }}</span>
        <span class="accept-order" @click="acceptOrder">Accept</span>
      </div>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.loggedinUser,
    };
  },

  computed: {
    // loggedInUser() {
    //   return 'Chef'
    // },
    orders() {
      const orders = this.$store.getters.orders;
      // return orders.filter((oreder) => oreder.buyer._id === this.user._id);

   },
  },

  methods: {
    acceptOrder() {},
  },

  created() {
    this.$store.dispatch({ type: "loadOrders" });

    // -------------------------------------------------------
    // -------------------------------------------------------
  },
};
</script>

