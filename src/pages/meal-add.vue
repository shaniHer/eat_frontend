<template>
  <section class="meal-add main-layout">
    <div class="add-meal-container flex">
      <form class="meal-details" @submit.prevent="saveMeal" v-if="meal">
        <h2 class="page-title">Create new event</h2>
        <div class="flex space-between">
          <label for="meal-title">Event title</label>
          <input type="text" v-model="meal.title" id="meal-title" />
        </div>
        <div class="flex space-between">
          <label for="meal-desc">A word about the experience</label>
          <input type="text" v-model="meal.desc" id="meal-desc" />
        </div>
        <div class="flex space-between">
          <label>Price per person</label>
          <input type="number" v-model="meal.price" />
        </div>
        <div class="flex space-between">
          <label>Capacity</label>
          <input type="number" v-model.number="meal.capacity" />
        </div>
        <div class="flex space-between">
          <label>Vegeterian</label>
          <input type="checkbox" v-model="meal.vegeterian" />
        </div>
        <div class="flex space-between">
          <label>Vegan</label> <input type="checkbox" v-model="meal.vegan" />
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
        <div class="flex space-between"><label>Upload Images</label></div>
        <button class="btn-save">Save</button>
      </form>
      <!-- <div class="img-gallery-add">
        <div class="add-img large-img">Add image</div>
        <div class="add-img medium-img">Add image</div>
        <div class="add-img small-img">Add image</div>
        <div class="add-img small-img">Add image</div> -->
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
        <!-- <div class="add-img small-img">
          <template v-if="!isLoading">
            <label
              for="img-uploader"
              @drop.prevent="handleFile"
              @dragover.prevent="isDragOver = true"
              @dragleave="isDragOver = false"
              :class="{ drag: isDragOver }"
            >
              <h3 v-if="!isDragOver">Add image</h3>
              <h3 v-else>Drop image here</h3>
            </label>
            <input
              type="file"
              name="img-uploader"
              id="img-uploader"
              @change="handleFile"
            />
          </template>
          <img
            class="loader"
            v-else
            src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            alt=""
          />
        </div>
        <div class="add-img small-img">Add image</div> -->
        <!-- <img
          :src="require('@/assets/img/chef-details.jpg')"
          class="large-img"
        />
        <img :src="require('@/assets/img/meal.jpg')" class="medium-img" />
        <img :src="require('@/assets/img/pizza.jpg')" class="small-img" />
        <img :src="require('@/assets/img/plates.jpg')" class="small-img" /> -->
      </div>
    </div>
    <div></div>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
import { NEWmealService } from "@/services/NEW-meal-service.js";
import imgList from "@/cmps/img-list.cmp";
import imgUpload from "@/cmps/img-upload.cmp";
import userAvatar from "@/cmps/user-avatar.cmp";
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
      //   isLoading: false,
      // isDragOver: false,
    };
  },

  created() {
    this.createMeal();
  },
  methods: {
    //   handleFile(ev) {
    //   let file;
    //   if (ev.type === "change") file = ev.target.files[0];
    //   else if (ev.type === "drop") file = ev.dataTransfer.files[0];
    //   this.onUploadImg(file);
    // },

    // async onUploadImg(file) {
    //   this.isLoading = true;
    //   this.isDragOver = false;
    //   const res = await uploadImg(file);
    //   // this.$emit("save", res.url);
    //   this.saveImg(res.url, 'small1')
    //   this.isLoading = false;
    // },
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
        await this.$store.dispatch({ type: "saveMeal", meal: this.meal });
        this.createMeal();
        // this.$router.push('/meal/')
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
    userAvatar,
    imgList,
    imgUpload,
  }
};
</script>




