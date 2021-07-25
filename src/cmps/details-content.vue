<template>
  <div class="details-container">
    <div class="meal-desc">
      <p class="bold subtitle">A word about the experience</p>
      <p>Experience a truly memorable meal, 3-course traditional Thai Bistro dinner</p>
      <p>Aperitif, wine, beer, dessert wine, coffee and tea are included</p>
      <p>Enjoying your evening while swapping stories and listening to music. </p>
      <p>You'll leave this event feeling like a member of Songmeal family!</p>
    </div>

    <div class="menu details-section">
      <h3 class="menu-title bold subtitle">Menu</h3>
      <div class="menu-sections flex">
        <div class="menu-section starter">
          <p class="section-title">Starters</p>
          <ul>
            <li v-for="starter in meal.menu.starter" :key="starter.name">
              <p>{{ starter.name }}</p>
              <p>{{ starter.desc }}</p>
            </li>
          </ul>
        </div>
        <div class="menu-section main">
          <p class="section-title">Main</p>
          <ul>
            <li v-for="main in meal.menu.main" :key="main.name">
              <p>{{ main.name }}</p>
              <p>{{ main.desc }}</p>
            </li>
          </ul>
        </div>
        <div class="menu-section desert">
          <p class="section-title">Desert</p>
          <ul>
            <li v-for="desert in meal.menu.desert" :key="desert.name">
              <p>{{ desert.name }}</p>
              <p>{{ desert.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="reviews-container details-section">
      <div>
        <img class="star" src="@/assets/icons/star.svg" />
        <span class="reviews-title">
          {{ host.host.rate }}<span> | 68 reviews</span></span
        >
      </div>
      <ul class="review-list flex">
        <li
          v-for="review in host.reviews"
          :key="review._id"
          class="review-card"
        >
          <div class="review-header flex">
            <img
              class="avatar"
              :src="require(`@/assets/img/usersImg/${review.by.imgUrl}.jpg`)"
              alt=""
            />
            <!-- <img
              class="avatar"
              :src="require('@/assets/img/img1.jpg')"
              alt=""
            /> -->
            <div class="details">
              <span>{{ review.by.fullname }}</span>
              <div>
                <span
                  class="rating-stars"
                  v-for="star in review.rate"
                  :key="star"
                >
                  <img class="star" src="@/assets/icons/star.svg" />
                </span>
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
    host: Object,
  },

  data() {
    return {};
  },
};
</script>

