<template>
  <section class="home main-layout">
    <h2 class="text-home">Top rated meals</h2>
    <div class="meal-list-home-container">
      <meal-list-home :meals="meals"></meal-list-home>
    </div>

    <h2 class="text-home">Cuisine type</h2>
    <div class="cuisine-type-container">
      <div class="cuisine-type" @click="setFilter('asian')">
        <img src="@/assets/img/chefs/4.jpg" alt="" />
        <div class="flach">
        <h3>Asian</h3>
        </div>
      </div>
      <div class="cuisine-type" @click="setFilter('thai')">
        <img src="@/assets/img/chefs/9.jpg" alt="" />
         <div class="flach">
        <h3>Thai</h3>
        </div>
      </div>
      <div class="cuisine-type" @click="setFilter('american')">
        <img src="@/assets/img/chefs/3.jpg" alt="" />
         <div class="flach">
        <h3>American</h3>
        </div>
      </div>
      <div class="cuisine-type" @click="setFilter('czechoslovak')">
        <img src="@/assets/img/chefs/5.jpg" alt="" />
         <div class="flach">
        <h3>Czechoslovak</h3>
         </div>
      </div>
    </div>
    <div class="cusine-container" v-if="isByCuisine">
      <meal-list-home :meals="mealsByCuisine"></meal-list-home>
    </div>
      <h2 class="text-home">Where to eat</h2>
      <div class="where-container">
        <div class="where where-farm"><img src="@/assets/img/where/1.jpg" alt="">
        <h2>Farm</h2></div>
        <div class="where where-out"><img src="@/assets/img/where/2.jpg" alt="">
        <h2>Nature</h2></div>
        <div class="where where-home"><img src="@/assets/img/where/3.jpg" alt="">
        <h2>Home</h2></div>
      </div>

    <!-- <router-link to="/meal-app"></router-link> -->
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