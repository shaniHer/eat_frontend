<template>
  <section class="meal-preview-home">
    <router-link :to="'/meal/' + meal._id">
      <div class="img card">
        <img :src="require(`@/assets/img/meat/${imgUrl}.jpg`)" />
        <div class="price">
          <h3>${{ meal.price }}</h3>
        </div>
      </div>
      <div class="card-text">
        <h3 class="card-desc"><span>Dinner</span> in Tel Aviv-Yafo</h3>
        <h3 class="card-title">{{ meal.title }}</h3>
        <!-- <h4 class="card-rate"><span>rate:{{ meal.host.rate }}</span><span>price:${{ meal.price }}</span></h4> -->
        <!-- <h4 class="card-price">${{ meal.price }}</h4> -->
        <h4 class="card-rate">
          rate:{{ meal.host.rate }}/5 <span>&#9733;</span>(32)
        </h4>
        <div class="card-fullname-container">
          <div class="avatar-img">
            a
            <img src="" alt="" />
          </div>
          <div class="card-fullname">
            <span>Hosted by</span>
            <span>{{ meal.host.fullname }}</span>
          </div>
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
    
    };
  },
  computed: {
    imgUrl() {
      return this.meal.host.imgUrl;
    },
  },
};
</script>

<style>
</style>