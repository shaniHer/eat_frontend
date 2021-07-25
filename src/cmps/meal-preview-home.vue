<template>
  <section class="meal-preview-home">
    <router-link :to="'/meal/' + meal._id" >
      <div class="img card">
        <img :src="require(`@/assets/img/previews/${meal.imgUrl}.jpg`)" />
        <!-- <img :src="meal.imgUrl" /> -->
        <div class="price">
          <h3>${{ meal.price }}</h3>
        </div>
      </div>
      <div class="card-text">
        <h3 class="card-desc"><span>Dinner</span> in Tel Aviv-Yafo</h3>
        <h3 class="card-title">{{ meal.title }}</h3>
        <h4 class="card-rate">
         {{ meal.host.rate }}<img src="@/assets/icons/star.svg" alt=""/><span class="reviews">({{reviews}})</span>
        </h4>
        <div class="card-fullname-container">
          <div class="avatar-img">
            <img :src="require(`@/assets/img/chefs/${meal.host.imgUrl}.jpg`)" alt="" />
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
import {util} from "@/services/util.js"
export default {
  props: {
    meal: Object,
  },
  data() {
    return {};
  },
  computed: {
    imgUrl() {
      return this.meal.host.imgUrl;
    },
    reviews(){
     return util.getRndInteger(20,50)
    },
    clearfilter(){
      console.log('hi')
    }
  },
  components:{
    
  }
};
</script>