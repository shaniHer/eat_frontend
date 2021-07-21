<template>
  <section class="signup">
    <div class="login-signup-title-btn">
      <h2 class="login-signup-title">Sign up</h2>
      <button class="btn btn-close" @click.stop.prevent="modalClose">x</button>
    </div>
    <form @submit.prevent="signup">
      <div class="input-login-signup">
        <input
          type="text"
          placeholder="Your full name"
          v-model="signupCredentials.fullname"
        />
        <input
          type="text"
          placeholder="username"
          v-model="signupCredentials.username"
        />
        <input
          type="password"
          placeholder="password"
          v-model="signupCredentials.password"
        />
      </div>
      <div class="button-login-signup">
        <button class="btn btn-login-signup">sign up</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      signupCredentials: { fullname: "", username: "", password: "" },
    };
  },
  methods: {
    signup() {
      this.$emit("signup", this.signupCredentials);
      this.signupCredentials = { fullname: "", username: "", password: "" };
    },
    modalClose() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>