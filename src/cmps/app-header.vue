<template>
  <header class="app-header">
    <div  :class="headerClass" class="full main-layout">
      <section class="app-header-container">
        <div class="logo">
          <router-link to="/">
            <h1>EatWith</h1>
          </router-link>
        </div>
        <!-- <div><input type="serach" placeholder="search" /></div> -->
        <!-- <section v-if="loggedinUser">
        <p>Hello {{ loggedinUser.fullname }}</p>
        <button @click="logout">Logout</button>
      </section> -->
        <nav class="main-nav">
          <router-link to="/meal-app">explore</router-link>
          <router-link to="/user-profile">user</router-link>
          <a @click="onLogin">login</a>
          <a @click="onSignup">signup</a>
        </nav>
        <div @click="modalClose" v-if="modal" class="screen-login-signup"></div>
        <div v-if="modal" class="modal-login-signup">
          <login
            @close="modalClose"
            @login="login"
            v-if="isLogin && modal"
          ></login>
          <signup
            @close="modalClose"
            @signup="signup"
            v-if="isSignup && modal"
          ></signup>
        </div>
      </section>
    </div>
  </header>
</template>

<script>
import login from "@/cmps/login";
import signup from "@/cmps/signup";
export default {
  data() {
    return {
      isLogin: false,
      isSignup: false,
      modal: false,
    };
  },
  computed: {
    // loggedinUser() {
    //   return this.$store.getters.loggedinUser;
    // },
    headerClass(){
      if(this.$route.name === "homePage"){
        return 'home'
      }
      return 'other';

    }
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
    async login(loginCredentials) {
      try {
        console.log(loginCredentials);
        const user = await this.$store.dispatch({
          type: "login",
          userCred: loginCredentials,
        });
        this.modalClose();
        console.log(user);
        const userMsg = {};
        userMsg.txt = `hi dear ${user.fullname}`;
        userMsg.type = "success";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
      } catch (err) {
        this.modalClose();
        const userMsg = {};
        userMsg.txt = "problem in login try again";
        userMsg.type = "danger";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
        console.log("err in login");
      }
    },
    async logout() {
      try {
        const msg = await this.$store.dispatch({ type: "logout" });
        const userMsg = {};
        userMsg.txt = msg;
        userMsg.type = "success";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
      } catch (err) {
        const userMsg = {};
        userMsg.txt = "problem in logout try again";
        userMsg.type = "danger";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
      }
    },
    async signup(signupCredentials) {
      try {
        const newUser = await this.$store.dispatch({
          type: "signup",
          userCred: signupCredentials,
        });
        console.log(newUser);
        const userMsg = {};
        userMsg.txt = `sign up worked fine ${newUser.fullname}`;
        userMsg.type = "success";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
        this.modalClose();
      } catch (err) {
        console.log("err in signup");
        const userMsg = {};
        userMsg.txt = `err in signup`;
        userMsg.type = "danger";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
        this.modalClose();
      }
    },
  },
  components: {
    login,
    signup,
  },
};
</script>
