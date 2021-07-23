<template>
  <section class="meal-list">
    <ul class="card-grid"> 
      <li  v-for="meal in getMeals" :key="meal.id" class="meal-list-card">
        <meal-preview-home :meal="meal">

        </meal-preview-home>
        <!-- <meal-preview
          v-for="meal in getMeals"
          :key="meal.id"
          :meal="meal"
        ></meal-preview> -->
      </li>
    </ul>
  </section>
</template>

<script>
import mealPreview from "@/cmps/meal-preview.vue";
import mealPreviewHome from "@/cmps/meal-preview-home";

export default {
  // ----------------------------
  props: {
    getMeals: Array,
  },
  // ----------------------------

  components: {
    mealPreview,
    mealPreviewHome,
  },
  // ----------------------------
};
</script>
