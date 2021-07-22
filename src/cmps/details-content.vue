<template>
  <div class="details-container">
    <div class="title bold">{{ meal.title }}</div>
    <div >
      Hosted by <span class="host-name bold">{{ host.fullname }}</span>
    </div>
    <div class="meal-desc details-section">
      <p class="bold subtitle">A word about the experience</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Saepe provident in ducimus odio obcaecati.</p>
      <p>Ducimus, itaque dolore debitis incidunt animi quo,</p>
      <p>dolor dolorum ut quaerat est officiis ea architecto unde?</p>
    </div>
    
    <div class="menu details-section">
    <h3 class="menu-title bold subtitle">Menu</h3>
    <div class="menu-sections flex">
        <div class="menu-section starter">
            <p>Starters</p>
            <p>Tiny salad</p>
            <p>Veg wrap</p>
            <p>Fried shrimps</p>
        </div>
        <div class="menu-section main">
            <p>Main</p>
            <p>Fish and chips</p>
            <p>Sea food sald</p>
            <p>Roasted vegetables</p>
        </div>
        <div class="menu-section desert">
            <p>Desert</p>
            <p>Cheescake</p>
            <p>Cream</p>
            <p>Fruits on fire</p>
        </div>
    </div>
    </div>
    <div class="reviews-container details-section">
      <p class="bold subtitle">Some of our guests reviews</p>
      <ul class="review-list">
        <li
          v-for="review in host.reviews"
          :key="review._id"
          class="review-card"
        >
          <div class="review-header flex">
            <img
              class="avatar"
              :src="require('@/assets/img/img1.jpg')"
              alt=""
            />
            <div class="details">
              <span>{{review.by.fullname}}</span>
              <div>
                  <span class="rating-stars" v-for="star in review.rate" :key="star"> &#9733; </span>
                    <span class="rating-details">{{ review.rate }}/5</span>
              </div>
            </div>
          </div>
          <div class="review-body">
            <p>{{ review.txt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        meal: Object,
        host: Object
    },

    data(){
        return {

        }
    }
};
</script>

