<template>
  <header class="app-header full main-layout" :class="headerClass">
    <!-- <div class="screen-main-nav" v-if="isNav" @click="onNav"></div> -->



  <!-- <header class="app-header full main-layout" :class="headerClass"> -->  <!-- @@ -->
  <header class="app-header" :class="headerClass">                       <!-- ** -->
  <div class="navnav full"><!-- ** -->
    <div class="app-header-container">
      <div class="logo">
        <router-link to="/">
          <h1>Eat<span >|</span>it</h1>
        </router-link>
      </div>



      <div class="main-real-nav" v-if="isHome">
        <router-link to="/meal-app">explore</router-link>
        <router-link to="/meal-app">something </router-link>
        <router-link to="/meal-app">something else</router-link>
      </div> 


<!-- -------------------------------------****-----------------------NAV -->
  <!-- <div class="search-box">
    <button class="search-btn">🔍</button>
   <input class="sb-input">
   <input class="sb-input"> 

   <input class="sb-input">
  </div> -->

<!-- ------------------------------------------------------------NAV -->








      <!-- <template v-if="loggedinUser">
        <p>Hello {{ loggedinUser.fullname }}</p>
        <button @click="logout">Logout</button>
      </template> -->
      <div class="becomehost-burger-container">
        <div class="becomehost-burger-container-1">
          <div class="becomehost-burger-container-2">
            <router-link to="/meal-add">Become a host</router-link>
            <div class="burger-menu">
              <img
                src="@/assets/img/ham.svg"
                alt=""
                class="burger"
                @click="onNav"
              />
              <!-- <div class="avatar-menu"> -->
              <user-avatar class="avatar-menu"></user-avatar>
              <!-- <font-awesome-icon :icon="['fas', 'user-secret']" /> -->
              <!-- </div> -->
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
</div><!-- ** -->
      <!-- <div class="search-inputs">
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
      </div>  -->

      <!-- <nav class="main-nav" v-if="isNav">
        <a @click="onSignup">sign up</a>
        <a @click="onLogin">login</a>
        <router-link to="/user-profile">user</router-link>
      </nav> -->
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
    <div class="checkflex" v-if="isHome">
      <div class="checking">
        <h2>Host a meal</h2>
        <h2>Enjoy and get paid</h2>
      </div>
      <div class="checking">
        <h2>Host a meal</h2>
        <h2>Enjoy and get paid</h2>
      </div>
    </div>
  </header>
</template>

<script>
import login from "@/cmps/login";
import signup from "@/cmps/signup";
import userAvatar from "@/cmps/user-avatar.cmp";
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
  },
  methods: {
    onNav() {
      this.isNav = !this.isNav;
      console.log(this.isNav);
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
    userAvatar,
  },
};
</script>
