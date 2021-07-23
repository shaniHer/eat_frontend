<template>
  <section class="meal-filter main-layout">
    <!-- ---------------------------------filter by date:: -->
    <article class="inline">
      <span class="demonstration"></span>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a date"
        default-value="2021-07-15"
      >
      </el-date-picker>
    </article>

    <!-- ---------------------------------filter by cuisine: -->

    <el-select
      @change="filterByCuisine"
      v-model="cuisineName"
      placeholder="Cuisine"
    >
      <el-option
        :v-model="filter.cuisine"
        v-for="item in cuisineOptions"
        :key="item.idx"
        :label="item.label"
        :value="item.idx"
      >
      </el-option>
    </el-select>

    <!-- ---------------------------------filter by guests: -->

    <el-select @change="filterByGuests" v-model="idx" placeholder="Guests">
      <el-option
        v-for="item in guestsOptions"
        :key="item.idx"
        :label="item.label"
        :value="item.idx"
      >
      </el-option>
    </el-select>

    <!-- ---------------------------------filter by price: -->

    <el-select multiple placeholder="Price" v-model="price.emptyVal">
      <el-option value="emptyVal" :key="price.idx" :label="price.label">
        <el-slider
          class="price-filter"
          v-model="filter.price"
          range
          show-stops
          :max="2500"
          @change="emitFilter"
        >
        </el-slider>
      </el-option>
    </el-select>

    <!-- @@@@@@@@@@@@@@@@@@@@@@ -->

    <!-- <article>
      Filter by price:
      <el-slider
        class="price-filter"
        v-model="filter.price"
        range
        show-stops
        :max="2500"
        @change="emitFilter"
      >
      </el-slider>
    </article> -->

    <article class="meal-filter-btn inline">
      <!-- ---------------------------------filter by diet -->
      <el-button @click="filterBy('vegan')">Vegan</el-button>
      <el-button @click="filterBy('vegeterian')">Vegeterian</el-button>
      <!-- ----------------------------------->
      <el-button @click="clearFilter">Clear filter</el-button>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        diet: "all",
        price: 0,
        guests: {},
        cuisine: "",
      },

      // ----------------------------guests:

      guestsOptions: [
        {
          idx: 0,
          label: "0-2",
        },
        {
          idx: 1,
          label: "0-4",
        },
        {
          idx: 2,
          label: "0-8",
        },
        {
          idx: 3,
          label: "0-12",
        },
        {
          idx: 4,
          label: "0-25",
        },
      ],
      idx: "",

      // ----------------------------cuisine:

      cuisineOptions: [
        {
          idx: 0,
          label: "All",
        },
        {
          idx: 1,
          label: "Thai",
        },
        {
          idx: 2,
          label: "Asian",
        },
        {
          idx: 3,
          label: "American",
        },
        {
          idx: 4,
          label: "Czechoslovak",
        },
      ],
      cuisineName: "",

      // ----------------------------date:
      date: "",
      // ----------------------------
      price: {
        idx: "",
        label: "price",
      },
    };
  },

  // ----------------------------

  methods: {
    emitFilter() {
      this.$emit("filter", JSON.parse(JSON.stringify(this.filter)));
    },

    filterBy(txt) {
      this.filter.diet = txt;
      this.emitFilter();
    },

    filterByGuests(idx) {
      const guestsStr = this.guestsOptions[idx].label;
      const guests = {
        min: +guestsStr[0],
        max: +guestsStr.substring(2, guestsStr.length),
      };
      this.filter.guests = guests;
      this.emitFilter();
    },

    filterByCuisine(cuisineName) {
      const cuisine = this.cuisineOptions[cuisineName].label;
      this.filter.cuisine = cuisine.toLowerCase();
      if (this.filter.cuisine === "all") this.filter.cuisine = "";
      this.emitFilter();
    },

    clearFilter() {
      this.filter = { diet: "all", price: 0, guests: {}, cuisine: "" };
      this.emitFilter();
    },
  },

  // ------------------------------------
  created() {
    // this.clearFilter();
    // console.log(this.$store.getters.getFilter);
    this.cuisineName = this.$store.getters.getFilter.cuisine;
  },

  destroyed() {
    // ------------------------------------------------- @@@
    this.$store.getters.getFilter.cuisine = "";
    this.$store.getters.getFilter.price = "";
    this.$store.getters.getFilter.guests = {};
    this.$store.getters.getFilter.diet = "all";
    // -------------------------------------------------
  },
};
</script>

<style>
</style>