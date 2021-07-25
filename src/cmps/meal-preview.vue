<template>
  <section class="meal-preview">
    <router-link :to="'/meal/' + meal._id">
      <article class="meal-preview-card">
        <img :src="meal.mealImgUrl" class="image" />
        <article>Host:{{ meal.host.fullname }}</article>
        <b
          ><article>{{ meal.title }}</article></b
        >
        <article>${{ meal.price }}</article>
        <time class="time"> {{ date }}</time>
      </article>
    </router-link>
  </section>
</template>

<script>
import { util } from "../services/util.js";
export default {
  props: { meal: { type: Object } },

  data() {
    return {};
  },

  computed: {
    date() {
      const date = util.getDate();
      const time = util.getTime();
      return date + " " + time;
    },
  },

  methods: {},

  created() {},
};
</script>

<style>
</style>

