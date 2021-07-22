<template>
  <footer class="app-footer full main-layout">
    <section class="app-footer-container">
      <div class="coffee-container">
        <div class="logo">
          <h1>Eat<span>|</span>it</h1>
        </div>
        <div class="all-icons">
          <img src="@/assets/icons/apple.svg" alt="" />
          <img src="@/assets/icons/google.png" alt="" />
          <font-awesome-icon :icon="['fab', 'facebook-square']" />
          <font-awesome-icon :icon="['fab', 'twitter']" />
          <font-awesome-icon :icon="['fab', 'linkedin']" />
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </div>
      </div>
      <!-- <div class="coffee-rights-title">
        <h2>coffee rights</h2>
        <h2>coffee rights</h2>
        <h2>coffee rights</h2>
      </div> -->
      <div class="coffee-container-2">
        <ul>
          <li class="list">
            <h2>HOST</h2>
            <h4>Become a host</h4>
            <h4>Host online</h4>
            <h4>Responsible hosting</h4>
            <h4>Community center</h4>
          </li>
        </ul>
        <ul>
          <li class="list">
            <h2>ABOUT</h2>
            <h4>Careers</h4>
            <h4>How Eat it works</h4>
            <h4>Eat it 2021</h4>
            <h4>News room</h4>
          </li>
        </ul>
        <ul>
          <li class="list">
            <h2>SUPPORT</h2>
            <h4>Our COVID-19 Response</h4>
            <h4>Help center</h4>
            <h4>Cancellation options</h4>
            <h4>Trust</h4>
          </li>
        </ul>
        <ul>
          <li class="list">
            <h2>COMMUNITY</h2>
            <h4>Gift cards</h4>
            <h4>Accessibillty</h4>
          </li>
        </ul>
        <ul>
          <li class="list">
            <h2>IMPORTANT</h2>
            <h4>Privacy</h4>
            <h4>Terms</h4>
          </li>
        </ul>
      </div>
        <div class="rights">
          <h2>&copy; 2021 Eat it</h2>
        </div>
      <!-- <div class="coffee-container">
        <h2>coffee rights2</h2>
      </div>
      <div class="coffee-container">
        <h2>coffee rights3</h2>
      </div> -->
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