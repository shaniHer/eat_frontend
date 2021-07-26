<template>
  <section class="main-layout user-host">
    <table>
      <tr>
        <th>Meal</th>
        <th>Guests</th>
        <th>capacity</th>
        <th>Pice</th>
        <th>Total</th>
      </tr>
      <tr v-for="details in mealsHost" :key="details._id">
        <td>{{ details.shortTitle }}</td>
        <td>{{ details.guests }}</td>
        <td>{{ details.capacity }}</td>
        <td>${{ details.price }}</td>
        <td>${{ details.price * details.guests }}</td>
      </tr>
      <tr class="expected-revenue">
        <h4>Expected revenue</h4>
        <h4>${{ totalPrice }}</h4>
      </tr>
    </table>
    <chart :mealsTitle="mealsTitle" :mealsHost="mealsHost" id="myChart"></chart>
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
      shortTitle: "",
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
    mealsTitle() {
      let mealTitle = [];
      this.mealsHost.forEach((meal) => {
        // meal.shortTitle = meal.title.substring(0, 8);

        mealTitle.push(meal.title);
      });
      return mealTitle;
    },
  },

  // -----------------------------------

  created() {
    // this.$store.dispatch({ type: "loadMeals" });
     this.meals.forEach((meal) => {
        return meal.shortTitle = meal.title.substring(0,9)
      });
  },
  // -----------------------------------
  components: {
    chart,
  },
};
</script>

<style>
</style>