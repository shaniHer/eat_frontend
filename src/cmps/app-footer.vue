<template>
  <footer class="app-footer full main-layout">
    <section class="app-footer-container">
      <div class="coffee-container">
        <div class="logo">
          <h1>Eat it</h1>
        </div>
        <div class="all-icons">
          <img src="@/assets/icons/apple.svg" alt="">
          <img src="@/assets/icons/google.png" alt="">
          <font-awesome-icon :icon="['fab','facebook-square']"/>
          <font-awesome-icon :icon="['fab','twitter']"/>
          <font-awesome-icon :icon="['fab','linkedin']"/>
          <font-awesome-icon :icon="['fab','instagram']"/>
         </div>
      </div>
      <div class="coffee-container">
        <h2>coffee rights</h2>
        <ul>
          <li>
            <h4>coffee rights</h4>
            <h4>coffee rights</h4>
            <h4>coffee rights</h4>
          </li>
        </ul>
        <ul>
          <li>
            <h4>coffee rights</h4>
            <h4>coffee rights</h4>
            <h4>coffee rights</h4>
          </li>
        </ul>
        <ul>
          <li>
            <h4>coffee rights</h4>
            <h4>coffee rights</h4>
            <h4>coffee rights</h4>
          </li>
        </ul>
      </div>
      <div class="coffee-container">
        <h2>coffee rights2</h2>
      </div>
      <div class="coffee-container">
        <h2>coffee rights3</h2>
      </div>
      <!-- <el-button type="text" @click="open">Click to open Message Box</el-button> -->
    </section>
  </footer>
</template>

<script>
export default {
  methods: {
    // open() {
    //   this.$prompt("Please input your e-mail", "Tip", {
    //     confirmButtonText: "OK",
    //     cancelButtonText: "Cancel",
    //     inputPattern:
    //       /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    //     inputErrorMessage: "Invalid Email",
    //   })
    //     .then(({ value }) => {
    //       this.$message({
    //         type: "success",
    //         message: "Your email is:" + value,
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "Input canceled",
    //       });
    //     });
    // },
  },
};
</script>

<style>
</style>