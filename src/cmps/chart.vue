
<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: { mealsHost: { type: Array } },
  mounted() {
    this.renderChart({
      labels: this.mealsTitle,
      datasets: [
        {
          label: "Orders chart", //???
          data: this.mealsMoney,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    });
  },

  //   -----------------------------------

  computed: {
    mealsTitle() {
      let mealTitle = [];
      this.mealsHost.forEach((meal) => {
        mealTitle.push(meal.title);
      });
      console.log(mealTitle);
      return mealTitle;
    },

    mealsMoney() {
      let mealPrice = [];
      this.mealsHost.forEach((meal) => {
        mealPrice.push(meal.price * meal.guests);
      });

      mealPrice.push(0); //????????????
      return mealPrice;
    },
  },

  //   -----------------------------------

  created() {},
};
</script>

<style>
</style>

