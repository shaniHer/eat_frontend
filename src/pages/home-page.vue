<template>
  <section class="main-layout">
    <h2 class="text-home">Top rated meals</h2>
    
    <div class="meal-list-home-container">
      <meal-list-home :meals="meals"></meal-list-home>
    </div>

    <h2 class="text-home">Cuisine type</h2>
    <div class="cuisine-type-container">
      <div class="cuisine-type" @click="setFilter('asian')">
        <img src="@/assets/img/chefs/4.jpg" alt="" />
        <h3>Asian</h3>
      </div>
      <div class="cuisine-type" @click="setFilter('thai')">
        <img src="@/assets/img/chefs/9.jpg" alt="" />
        <h3>Thai</h3>
      </div>
      <div class="cuisine-type" @click="setFilter('american')">
        <img src="@/assets/img/chefs/3.jpg" alt="" />
        <h3>American</h3>
      </div>
      <div class="cuisine-type" @click="setFilter('czechoslovak')">
        <img src="@/assets/img/chefs/5.jpg" alt="" />
        <h3>Czechoslovak</h3>
      </div>
      <div class="cuisine-type" @click="setFilter('italian')">
        <img src="@/assets/img/chefs/7.jpg" alt="" />
        <h3>Italian</h3>
      </div>
      <div class="cuisine-type" @click="setFilter('britain')">
        <img src="@/assets/img/chefs/2.jpg" alt="" />
        <h3>Great britain</h3>
      </div>
    </div>
    <div class="cusine-container" v-if="isByCuisine">
      <meal-list-home :meals="mealsByCuisine"></meal-list-home>
    </div>

    <router-link to="/meal-app"></router-link>|<!-- @@ -->
  </section>
</template>

<script>
import mealListHome from "../cmps/meal-list-home";
export default {
  data() {
    return {
      isByCuisine: false,
    };
  },
  created() {
    this.loadMeals();
    // try {
    //   const meals = await this.$store.dispatch({ type: "loadMeals" });
    //   console.log("all cards", meals);
    // } catch (err) {
    //   console.log("some problem", err);
    // }
  },
  computed: {
    meals() {
      const meals = this.$store.getters.mealsToShowHomepage;
      return meals;
    },
    filterBy() {
      return { ...this.$store.getters.getFilter };
    },
    mealsByCuisine() {
      //  this.$router.push(`/edit/${toyId}`);
      const meals = this.$store.getters.mealsToShowCuisine;
      console.log(meals);
      this.$router.push(`/meal-app/${meals}`);
      // ------------------------
      // return this.$store.getters.mealsToShowCuisine;
    },
  },
  methods: {
    setFilter(txt) {
      this.filterBy.cuisine = txt;
      console.log(this.filterBy);
      this.isByCuisine = true;
      this.$store.commit({ type: "setFilter", filter: this.filterBy });
      this.loadMeals();
    },
    async loadMeals() {
      try {
        await this.$store.dispatch({ type: "loadMeals" });
      } catch (err) {
        console.log("some problem", err);
      }
    },
  },
  components: {
    mealListHome,
  },
};
</script>