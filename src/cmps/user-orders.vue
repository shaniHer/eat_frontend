<template>
  <section>
    <article v-if="orders">
      <table class="user-orders">
        <tr>
          <th>Host</th>
          <th>Title</th>
          <th>guestsNum</th>
          <th>totalPrice</th>
        </tr>
        <tr v-for="order in ordersToShow" :key="order._id">
          <td>{{ order.host.fullname }}</td>
          <td>{{ order.meal.title }}</td>
          <td>{{ order.guestsNum }}</td>
          <td>${{ order.totalPrice }}</td>
        </tr>
      </table>
    </article>
  </section>
</template>

<script>
export default {
  props: { orders: { type: Array }, logdinUser: { type: Object } },

  //   ---------------------------------
  computed: {
    ordersToShow() {
      return this.orders.filter(
        (order) => order.buyer._id === this.logdinUser._id
      );
    },
  },
};
</script>

<style>
</style>