<template>
  <section class="meal-filter">
    <!-- ---------------------------------filter by price: -->
    <article>
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
    </article>
    <!-- ---------------------------------filter by date:: -->
    <article class="inline">
      <span class="demonstration"></span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a date"
        default-value="2021-07-15"
      >
      </el-date-picker>
    </article>

    <!-- ---------------------------------filter by cuisine: -->

    <el-select
      @change="filteByCuisine"
      v-model="cuisineIdx"
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

    <el-select @change="filteByGuests" v-model="idx" placeholder="Guests">
      <el-option
        v-for="item in guestsOptions"
        :key="item.idx"
        :label="item.label"
        :value="item.idx"
      >
      </el-option>
    </el-select>

    <!-- ---------------------------------filter by diet -->

    <article class="meal-filter-btn inline">
      <el-button @click="filterBy('vegan')">Vegan</el-button>
      <el-button @click="filterBy('vegeterian')">Vegeterian</el-button>
    </article>

    <!-- ---------------------------------clear filter -->
    <el-button @click="clearFilter">Clear filter</el-button>
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
      cuisineIdx: "",

      // ----------------------------date:
      value1: "",
      // ----------------------------
      price: {
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

    filteByGuests(idx) {
      const guestsStr = this.guestsOptions[idx].label;
      const guests = {
        min: +guestsStr[0],
        max: +guestsStr.substring(2, guestsStr.length),
      };
      this.filter.guests = guests;
      this.emitFilter();
    },

    filteByCuisine(cuisineIdx) {
      const cuisine = this.cuisineOptions[cuisineIdx].label;
      this.filter.cuisine = cuisine.toLowerCase();
      if (this.filter.cuisine === "all") this.filter.cuisine = "";
      this.emitFilter();
    },

    clearFilter() {
      this.filter = { diet: "all", price: 0, guests: {}, cuisine: "" };
      this.emitFilter();
    },
  },
};
</script>

<style>
</style>