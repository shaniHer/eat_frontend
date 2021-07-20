<template>
  <section>
    <h3>Create a new event</h3>
    <form @submit.prevent="saveMeal">
      <label>Title</label><input type="text" v-model="meal.title" />
      <label>Price per person</label
      ><input type="number" v-model="meal.price" /> <label>Capacity</label
      ><input type="number" v-model.number="meal.capacity" />
      <label>Vegeterian</label
      ><input type="checkbox" v-model="meal.vegeterian" /> <label>Vegan</label
      ><input type="checkbox" v-model="meal.vegan" /> <label>Cuisine</label
      ><select v-model="meal.cuisine">
        <option value="Thai"></option>
        <option value="Asian"></option>
        <option value="American"></option>
        <option value="Czechoslovak"></option>
      </select>
      <label>Upload Images</label>
      <button>Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pageHeader: "Add new meal",
      meal: null,
    };
  },

  created() {
    // if (this.$store.getters.mealToEdit) {
    //   this.meal = JSON.parse(JSON.stringify(this.$store.getters.mealToEdit));
    //   this.title = "Update Toy";
    // } else {
    this.meal = mealService.getEmptyMeal();
    //   this.title = "Add Toy";
    // }
  },
  methods: {
    async saveToy() {
      this.toy.createdAt = Date.now();
      this.toy.imgNum = Math.floor(Math.random() * 3 + 1);
      try {
        await this.$store.dispatch({ type: "saveToy", toy: this.toy });
      } catch (err) {
        console.log("cannot save toy", err);
        throw err;
      } finally {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("closeModal");
      this.toy = null;
      this.$store.commit({ type: "setToyToUpdate", toy: null });
    },
  },
};
</script>