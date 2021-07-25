<template>
  <section class="meal-list">
    <ul class="card-grid">
      <li v-for="meal in getMeals" :key="meal.id" class="meal-list-card">
        <meal-preview-home :meal="meal"> </meal-preview-home>
      </li>
    </ul>
  </section>
</template>

<script>
import mealPreviewHome from "@/cmps/meal-preview-home";

export default {
  // ----------------------------
  props: {
    getMeals: Array,
  },
  // ----------------------------

  components: {
    mealPreviewHome,
  },
  // ----------------------------
};
</script>
