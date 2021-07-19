<template>
  <header class="app-header full main-layout">
    <section class="app-header-container">
      <div class="logo">
        <router-link to="/">
          <h1>EatWith</h1>
        </router-link>
      </div>
      <div><input type="serach" placeholder="search" /></div>
      <!-- <section v-if="loggedinUser">
        <p>Hello {{ loggedinUser.fullname }}</p>
        <button @click="logout">Logout</button>
      </section> -->
      <nav class="main-nav">
        <router-link to="/meal-app">explore</router-link>|
        <a @click="onLogin">login</a>|
        <a @click="onSignup">signup</a>
      </nav>
      <div @click="modalClose" v-if="modal" class="screen-login-signup"></div>
      <div v-if="modal" class="modal-login-signup">
        <section v-if="isLogin && modal" class="login">
          <div class="login-signup-title-btn">
            <h2 class="login-signup-title">Login</h2>
            <button class="btn btn-close" @click.self.stop.prevent="modalClose">
              x
            </button>
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
        <section v-if="isSignup && modal" class="signup">
          <div class="login-signup-title-btn">
            <h2 class="login-signup-title">Signup</h2>
            <button class="btn btn-close" @click.self.stop.prevent="modalClose">
              x
            </button>
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
              <button class="btn btn-login-signup">signup</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  data() {
    return {
      loginCredentials: { username: "", password: "" },
      signupCredentials: { fullname: "", username: "", password: "" },
      isLogin: false,
      isSignup: false,
      modal: false,
    };
  },
  computed: {
    // loggedinUser() {
    //   return this.$store.getters.loggedinUser;
    // },
  },
  methods: {
    onLogin() {
      this.modalOpen();
      this.isSignup = false;
      this.isLogin = true;
    },
    onSignup() {
      this.modalOpen();
      this.isLogin = false;
      this.isSignup = true;
    },
    modalClose() {
      this.modal = false;
    },
    modalOpen() {
      this.modal = true;
    },
    // login() {
    // console.log("hi log");
    // this.modalClose();
    // this.loginCredentials = { username: "", password: "" };
    // },
    // signup() {
    // console.log("hi sign");
    // this.modalClose();
    // this.signupCredentials = { fullname: "", username: "", password: "" };
    // },
    async login() {
      try {
        console.log(this.loginCredentials);
        const user = await this.$store.dispatch({
          type: "login",
          userCred: this.loginCredentials,
        });
        this.modalClose();
        this.loginCredentials = { username: "", password: "" };
        console.log(user);
        const userMsg = {};
        userMsg.txt = `hi dear ${user.fullname}`;
        userMsg.type = "success";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
      } catch (err) {
        this.modalClose();
        this.loginCredentials = { username: "", password: "" };
        const userMsg = {};
        userMsg.txt = "problem in login try again";
        userMsg.type = "danger";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
        console.log("err in login");
      }
    },
    // async logout() {
    //   try {
    //     const msg = await this.$store.dispatch({ type: "logout" });
    //     const userMsg = {};
    //       userMsg.txt = msg;
    //       userMsg.type = "success";
    //       this.$store.dispatch({ type: "setUserMsg", userMsg });
    //   } catch (err) {
    //     const userMsg = {};
    //       userMsg.txt = 'problem in logout try again';
    //       userMsg.type = "danger";
    //       this.$store.dispatch({ type: "setUserMsg", userMsg });
    //   }
    // },
    async signup() {
      try {
        const newUser = await this.$store.dispatch({
          type: "signup",
          userCred: this.signupCredentials,
        });
        console.log(newUser);
        const userMsg = {};
        userMsg.txt = `sign up worked fine ${newUser.fullname}`;
        userMsg.type = "success";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
        this.modalClose();
        this.signupCredentials = { fullname: "", username: "", password: "" };
      } catch (err) {
        console.log("err in signup");
        const userMsg = {};
        userMsg.txt = `err in signup`;
        userMsg.type = "danger";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
        this.modalClose();
        this.signupCredentials = { fullname: "", username: "", password: "" };
      }
    },
  },
  components: {},
};
</script>
