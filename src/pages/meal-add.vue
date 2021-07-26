<template>
  <section class="meal-add main-layout">
    <h2 class="page-title">Create new event</h2>
    <div class="add-meal-container flex space-between">
      <form class="meal-details" @submit.prevent="saveMeal" v-if="meal">
        <div class="meal-title-container flex space-between">
          <label for="meal-title">Event title</label>
          <input
            type="text"
            v-model="meal.title"
            id="meal-title"
            autocomplete="off"
          />
        </div>
        <div class="flex space-between">
          <label for="meal-desc">A word about the experience</label>
          <input
            type="text"
            v-model="meal.desc"
            id="meal-desc"
            autocomplete="off"
          />
        </div>
        <div class="flex space-between">
          <label for="meal-price">Price per person</label>
          <input type="number" v-model="meal.price" min="0" id="meal-price" />
        </div>
        <div class="meal-capacity flex space-between">
          <label for="meal-capacity">Capacity</label>
          <input
            type="number"
            v-model.number="meal.capacity"
            min="0"
            id="meal-capacity"
          />
        </div>
        <div class="flex space-between">
          <label for="meal-vegeterian">Vegeterian</label>
          <input
            type="checkbox"
            v-model="meal.vegeterian"
            id="meal-vegeterian"
          />
        </div>
        <div class="flex space-between">
          <label for="meal-vegan">Vegan</label>
          <input type="checkbox" v-model="meal.vegan" id="meal-vegan" />
        </div>
        <div class="flex space-between">
          <label>Cuisine</label>
          <select v-model="meal.cuisine">
            <option value="Thai">Thai</option>
            <option value="Asian">Asian</option>
            <option value="American">American</option>
            <option value="Czechoslovak">Czechoslovak</option>
          </select>
        </div>
        <button class="btn-save">Save</button>
      </form>
      <div class="img-gallery-add">
        <div class="add-img large-img">
          <img-upload
            v-if="!imgUrls.large"
            @save="saveImg($event, 'large')"
          ></img-upload>
          <img v-if="imgUrls.large" :src="imgUrls.large" alt="" />
          <button
            class="btn-img btn-img-large"
            v-if="imgUrls.large"
            @click="changeImg('large')"
          >
            x
          </button>
        </div>
        <div class="add-img medium-img">
          <img-upload
            v-if="!imgUrls.medium"
            @save="saveImg($event, 'medium')"
          ></img-upload>
          <img v-if="imgUrls.medium" :src="imgUrls.medium" alt="" />
          <button
            class="btn-img btn-img-medium"
            v-if="imgUrls.medium"
            @click="changeImg('medium')"
          >
            x
          </button>
        </div>
        <div class="add-img small-img">
          <img-upload
            v-if="!imgUrls.small1"
            @save="saveImg($event, 'small1')"
          ></img-upload>
          <img v-if="imgUrls.small1" :src="imgUrls.small1" alt="" />
          <button
            class="btn-img btn-img-small"
            v-if="imgUrls.small1"
            @click="changeImg('small1')"
          >
            x
          </button>
        </div>
        <div class="add-img small-img">
          <img-upload
            v-if="!imgUrls.small2"
            @save="saveImg($event, 'small2')"
          ></img-upload>
          <img v-if="imgUrls.small2" :src="imgUrls.small2" alt="" />
          <button
            class="btn-img btn-img-small"
            v-if="imgUrls.small2"
            @click="changeImg('small2')"
          >
            x
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
import { NEWmealService } from "@/services/NEW-meal-service.js";
import imgUpload from "@/cmps/img-upload.cmp";
export default {
  data() {
    return {
      imgUrls: {
        large: "",
        medium: "",
        small1: "",
        small2: "",
      },
      userAvatar: null,
      meal: {},
      isDetails: true,
      isGallery: true,
    };
  },

  created() {
    window.scrollTo(0, 0);
    this.createMeal();
  },
  methods: {
    changeImg(size) {
      this.imgUrls[size] = "";
    },
    saveImg(imgUrl, size) {
      this.imgUrls[size] = imgUrl;
      this.imgUrl = imgUrl;
    },

    setAvatar(imgUrl) {
      this.userAvatar = imgUrl;
    },
    async saveMeal() {
      try {
        this.meal.imgUrl=this.imgUrls.large
        await this.$store.dispatch({ type: "saveMeal", meal: this.meal });
        this.createMeal();
      } catch (err) {
        console.log("cannot save meal", err);
      }
    },

    async createMeal() {
      try {
        const emptyMeal = await NEWmealService.getEmptyMeal();
        this.meal = emptyMeal;
        const { _id, host, fullname, imgUrl } = await this.$store.getters
          .loggedinUser;
        this.meal.host = {
          _id: _id,
          rate: host.rate,
          fullname: fullname,
          imgUrl: imgUrl,
        };
      } catch (err) {
        console.log("err  in createMeal", err);
      }
    },
  },
  components: {
    imgUpload,
  },
};
</script>




