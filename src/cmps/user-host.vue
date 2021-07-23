<template>
  <section class="main-layout">
    <table class="user-orders">
      <tr>
        <th>Meal name</th>
        <th>Guests</th>
        <th>capacity</th>
        <th>Price</th>
        <th>Total price</th>
      </tr>
      <tr v-for="details in mealsHost" :key="details._id">
        <td>{{ details.title }}</td>
        <td>{{ details.guests }}</td>
        <td>{{ details.capacity }}</td>
        <td>${{ details.price }}</td>
        <td>${{ details.price * details.guests }}</td>
      </tr>
    </table>
    <td>${{ totalPrice }}</td>

    <article class="chart">
      <chart :mealsHost="mealsHost"  id="myChart"></chart>
    </article>
  </section>
</template>

<script>
import chart from "@/cmps/chart";
export default {
  props: {
    logdinUser: { type: Object },
    meals: { type: Array },
    orders: { type: Array },
  },

  // -----------------------------------

  data() {
    return {
      // meals: this.$store.getters.getMeals,
    };
  },

  // -----------------------------------

  computed: {
    mealsHost() {
      return this.meals.filter((meal) => meal.host._id === this.logdinUser._id);
    },

    totalPrice() {
      var sumMeals = 0;
      for (var i = 0; i < this.meals.length; i++) {
        sumMeals += this.meals[i].guests * this.meals[i].price;
      }
      return sumMeals;
    },
  },

  // -----------------------------------

  created() {
    // this.$store.dispatch({ type: "loadMeals" });
  },
  // -----------------------------------
  components: {
    chart,
  },
};
</script>

<style>
</style>