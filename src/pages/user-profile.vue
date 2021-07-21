<template>
  <section>
    <h2>
      <img class="avatar" :src="require('@/assets/img/img1.jpg')" />
      <!-- Hi there! {{ user.username }} -->
    </h2>

    <article v-if="orders">
      <!-- @@ -->
      <ul v-for="order in ordersToShow" :key="order._id">
        <div class="order-item">
          <span>{{ order.createdAt }}</span>
          <span>{{ order.eventTime }}</span>
          <span>{{ order.guestsNum }}</span>
          <span>${{ order.totalPrice }}</span>
          <span>Accept</span>
        </div>
      </ul>
    </article>
    <!-- @@ -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      orders: [],
    };
  },

  computed: {
    // loggedInUser() {
    //   return 'Chef'
    // },


    ordersToShow() {
      console.log(this.user);
      console.log(this.orders);
      // const orders = this.$store.getters.orders;
      return this.orders.filter((order) => order.buyer._id === this.user._id);
   },
  },

  methods: {},

  created() {
    this.$store.dispatch({ type: "loadOrders" });
    this.user = this.$store.getters.loggedinUser;
    this.orders = this.$store.getters.orders;

  },
};
</script>

