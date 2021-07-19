<template>
  <section>
    <h2>Hi there! {{ loggedInUser }}</h2>
    <!-- <p>{{orders}}</p> -->
    <!-- <div class="orders-list">
            <span>Event</span>
            <span>Date</span>
            <span>Guests</span>
            <span>Total</span>
    </div> -->
    <ul  v-for="order in orders" :key="order._id">
        <div class="order-item">
            <span>{{order.meal.title}}</span>
            <span>{{order.eventTime}}</span>
            <span>{{order.guestsNum}}</span>
            <span>${{order.totalPrice}}</span>
            <span class="accept-order" @click="acceptOrder">Accept</span>
        </div>
    </ul>

  </section>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  computed: {
    loggedInUser() {
      return "Chef Chekovsky";
    },
    orders() {
      const orders = this.$store.getters.orders
      return orders;
    },
  },

  methods: {
  },

  created(){
    this.$store.dispatch({ type: "loadOrders" });

  }
  
};
</script>

