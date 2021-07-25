<template>
  <header class="app-header full main-layout" :class="headerClass">
    <div class="app-header-container">
      <div class="logo">
        <router-link to="/">
          <h1>Eat<span>|</span>it</h1>
        </router-link>
      </div>
      <div class="main-search-container">
        <form @submit.prevent="setFilter">
          <div class="main-search">
            <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
            <input
              type="search"
              id="main-location"
              v-model="txt"
              autocomplete="off"
              placeholder="search"
            />
            <button class="btn-search">search</button>
          </div>
        </form>
      </div>
      <div class="becomehost-burger-login-container">
        <div class="becomehost-burger-login">
          <div class="becomehost-burger">
            <router-link to="/meal-app">Explore</router-link>
            <router-link to="/meal-add">Become a host</router-link>
            <div class="burger-menu">
              <img
                src="@/assets/img/ham.svg"
                alt=""
                class="burger"
                @click="onNav"
              />
              <div class="avatar-menu">
               <img v-if="loggedinUser" :src="require('@/assets/img/chefs/10.jpg')" alt="" /> 
                <img
                  v-else
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="screen-main-nav" v-if="isNav" @click="onNav"></div>
          <nav class="main-nav" v-if="isNav">
            <div class="login-signup-border">
              <a @click="onSignup">Sign up</a>
              <a @click="onLogin">Login</a>
            </div>
            <div class="user-routes">
              <router-link to="/user-profile">User profile</router-link>
              <router-link to="/meal-add">Become a host</router-link>
            </div>
          </nav>
        </div>
      </div>
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
    <div class="main-title-container" v-if="isHome">
      <div class="main-title">
        <h2 class="text-main-title">Unforgettable</h2>
        <h2 class="text-main-title"><span>Culinary</span></h2>
        <h2 class="text-main-title">experiences</h2>
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
      txt: "",
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    headerClass() {
      if (this.$route.name === "homePage") {
        this.isHome = true;
        return "home";
      }
      this.isHome = false;
      return "other";
    },
    filterBy() {
      return JSON.parse(JSON.stringify(this.$store.getters.getFilter));
    },
  },
  methods: {
    setFilter() {
      this.filterBy.txt = this.txt;
      console.log(this.filterBy);
      this.$store.commit({ type: "setFilter", filter: this.filterBy });
      this.$router.push(`/meal-app`);
      this.txt = "";
    },
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
