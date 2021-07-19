<template>
  <section class="meal-list">
    <ul> 
      <li class="card-grid meal-list-card">
        <meal-preview
          v-for="meal in getMeals"
          :key="meal.id"
          :meal="meal"
        ></meal-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import mealPreview from "@/cmps/meal-preview.vue";

export default {
  // ----------------------------
  props: {
    getMeals: Array,
  },
  // ----------------------------

  components: {
    mealPreview,
  },
  // ----------------------------
};
</script>

<style>
</style>