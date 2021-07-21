<template>
  <section>
    <!-- <article v-if="orders"> -->
    <table class="user-orders">
      <tr>
        <th>Cuisine</th>
        <th>Guests</th>
        <th>capacity</th>
        <th>Price</th>
      </tr>
      <tr v-for="details in showTable" :key="details._id">
        <td>{{ details.cuisine }}</td>
        <td>{{ details.guests }}</td>
        <td>{{ details.capacity }}</td>
        <td>${{ details.price }}</td>
      </tr>
    </table>
    <!-- </article> -->
  </section>
</template>

<script>
export default {
  props: { logdinUser: { type: Object } },

  // -----------------------------------

  data() {
    return {
      meals: this.$store.getters.getMeals,
    };
  },

  computed: {
    showTable() {
      console.log(this.meals);
      // console.log(this.logdinUser);
      return this.meals.filter((meal) => meal.host._id === this.logdinUser._id);

      // console.log("bla", bla);
      // return bla;
    },
  },
};
</script>

<style>
</style>