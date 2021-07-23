<template>
<section class="meal-list-home" >
  <ul class="meal-list-home-container card-grid"> 
    <li v-for="meal in meals" :key="meal.id" >
      <meal-preview-home :meal="meal"  ></meal-preview-home>
    </li>
  </ul>
</section>
</template>

<script>
import mealPreviewHome from "@/cmps/meal-preview-home";
export default {
  props: {
    meals: Array,
  },
  components: {
    mealPreviewHome,
  },
};
</script>
