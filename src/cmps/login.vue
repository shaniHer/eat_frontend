<template>
  <section class="login">
    <div class="login-signup-title-btn">
      <h2 class="login-signup-title">Login</h2>
      <button class="btn btn-close" @click.stop.prevent="modalClose">x</button>
    </div>
    <form @submit.prevent="login">
      <div class="input-login-signup">
        <input
          type="text"
          placeholder="username"
          v-model="loginCredentials.username"
        />
        <input
          type="password"
          placeholder="password"
          v-model="loginCredentials.password"
        />
      </div>
      <div class="button-login-signup">
        <button class="btn btn-login-signup">Login</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loginCredentials: { username: "", password: "" },
    };
  },
  methods:{
      login(){
          this.$emit('login',this.loginCredentials)
          this.loginCredentials={ username: "", password: "" }
      },
      modalClose(){
          this.$emit('close')
      }
  }
};
</script>
