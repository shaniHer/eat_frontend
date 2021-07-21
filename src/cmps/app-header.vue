<template>
  <header class="app-header full main-layout" :class="headerClass">
    <div class="app-header-container">
      <div class="logo">
        <router-link to="/">
          <h1>Eat it</h1>
        </router-link>
      </div>
       <div class="search-inputs">
        <div class="search-location">
          <label for="search-location">location </label>
          <input type="search" id="search-location" />
        </div>
        <div class="search-guests">
          <label for="search-guests-id">guests</label>
          <select id="search-guests">
            <option value="Chocolate"></option>
            <option value="Coconut"></option>
            <option value="Mint"></option>
            <option value="Strawberry"></option>
            <option value="Vanilla"></option>
          </select>
        </div>
        <div class="search-date">
          <label for="search-date">date</label>
          <input type="date" id="search-date" />
        </div>
      </div> 
      <!-- <section v-if="loggedinUser">
        <p>Hello {{ loggedinUser.fullname }}</p>
        <button @click="logout">Logout</button>
      </section> -->
      <div class="main-real-nav" v-if="isHome">
        <router-link to="/meal-app">explore</router-link>
        <router-link to="/meal-app">something </router-link>
        <router-link to="/meal-app">something else</router-link>
      </div>
      <div class="becomehost-burger-container">
        <a >Become a host</a>
        <div class="burger-menu">
          <img
            src="@/assets/img/ham.svg"
            alt=""
            class="burger"
            @click="onNav"
          />
          <div class="avatar-menu">
            <font-awesome-icon :icon="['fas', 'user-secret']" />
          </div>
        </div>
      </div>
      <nav class="main-nav" v-if="isNav">
        <a @click="onSignup">signup</a>
        <a @click="onLogin">login</a>
        <router-link to="/user-profile">user</router-link>
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
    </div>
  </header>
</template>

<script>
import login from "@/cmps/login";
import signup from "@/cmps/signup";
export default {
  data() {
    return {
      loginCredentials: { username: "", password: "" },
      signupCredentials: { fullname: "", username: "", password: "" },
      isLogin: false,
      isSignup: false,
      modal: false,
      isNav: false,
      isHome: false,
    };
  },
  computed: {
    // loggedinUser() {
    //   return this.$store.getters.loggedinUser;
    // },
    headerClass() {
      if (this.$route.name === "homePage") {
        this.isHome = true;
        return "home";
      }
      this.isHome = false;
      return "other";
    },
  },
  methods: {
    onNav() {
      this.isNav = !this.isNav;
    },
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
