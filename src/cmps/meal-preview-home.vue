<template>
  <section class="meal-preview-home">
  <!-- <section class="meal-preview"> -->
  <router-link :to="'/meal/' + meal._id">
    <div class="card-container">
    <!-- <div class="meal-preview-card"> -->
      <div class="img card">
      <img :src="require(`@/assets/img/meat/${imgUrl}.jpg`)" />
      </div>
       <div class="card-text">
      <h4>title:{{ meal.title }}</h4>
      <h4>host: {{ meal.host.fullname }}</h4>
      <h4>Price: ${{ meal.price }}</h4>
       <!-- <router-link :to="'/meal/' + meal._id">Details</router-link>  -->
       </div> 
    </div>
      </router-link>
  </section>
</template>

<script>
export default {
  props: {
    meal: Object,
  },
  data() {
    return {
      // imgUrl:this.meal.imgUrl
      //   imgUrl: `2.jpg`,
      //   imgUrl: this.meal.host.imgUrl,
    };
  },
  computed: {
    imgUrl() {
      //   console.log(this.meal.host.imgUrl)
      return this.meal.host.imgUrl;
    },
  },
};
</script>

<style>
</style>