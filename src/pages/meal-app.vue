<template>
  <section class="meal-app main-layout">
    <meal-filter @filter="setFilter"></meal-filter>
    <meal-list :getMeals="getMeals"></meal-list>
  </section>
</template>
<script>
import mealList from "@/cmps/meal-list.vue";
import mealFilter from "@/cmps/meal-filter.vue";

export default {
  // ----------------------------
  async created() {
    window.scrollTo(0, 0);
    try {
      await this.$store.dispatch({ type: "loadMeals" });
    } catch (err) {
      console.log(err, "big problem");
    }
  },
  methods: {
    setFilter(filter) {
      this.$store.commit({ type: "setFilter", filter });
    },
  },

  // --------------------------

  computed: {
    getMeals() {
      return this.$store.getters.getMeals;
    },
  },

  // --------------------------

  components: {
    mealList,
    mealFilter,
  },
};
</script>
<style>
</style>