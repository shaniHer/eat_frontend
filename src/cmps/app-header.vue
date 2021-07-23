<template>
  <header class="app-header full main-layout" :class="headerClass">
    <div class="app-header-container">
      <div class="logo">
        <router-link to="/">
          <h1>Eat<span>|</span>it</h1>
        </router-link>
      </div>
      <!-- -------------------------------------****-----------------------NAV -->
      <!-- <div class="search-box"> 
                    <button class="search-btn">🔍</button>
                   <input class="sb-input">
                   <input class="sb-input"> 

                   <input class="sb-input">
                  </div>  -->

      <!-- ------------------------------------------------------------NAV -->
      <!-- <div class="main-search-container">
        <form @submit.prevent="submitSearch">
          <div class="main-search"> -->
      <!-- <el-input
              class="search-location"
              v-model="location"
              placeholder="By location"
            >
            </el-input> -->
      <!-- <div class="block"> -->
      <!-- <span class="demonstration">Default</span> -->
      <!-- <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
              >
              </el-date-picker> -->
      <!-- </div> -->
      <!-- <el-date-picker
              class="search-date"
              v-model="date"
              type="date"
              placeholder="Pick a date"
              default-value="2021-07-15"
            >
            </el-date-picker> -->
      <!-- <el-select
              class="search-guests"
              @change="filterByGuests"
              v-model="idx"
              placeholder="Guests"
            >
              <el-option
                v-for="item in guestsOptions"
                :key="item.idx"
                :label="item.label"
                :value="item.idx"
              >
              </el-option>
            </el-select> -->
      <!-- <button class="btn-search">
              <font-awesome-icon
                :icon="['fas', 'search']"
                class="search-icon"
              />
            </button>
          </div>
        </form> -->
      <!-- </div> -->
      <!-- ----------------------------------------------------------- -->
      <div class="main-search-container">
        <form @submit.prevent="setFilter">
          <div class="main-search">
            <div class="search-location">
              <label for="main-location">Location</label>
              <input
                type="text"
                id="main-location"
                v-model="location.name"
                autocomplete="off"
              />
            </div>
            <!-- <div class="search-date">
              <label for="main-date">Date</label>
              <input type="date" id="main-date" />
            </div>
            <div class="search-guests">
              <label for="main-guests">Guests</label>
              <select name="guests" id="main-guests">
                <option value="1">one</option>
                <option value="2">two</option>
                <option value="3">three</option>
              </select>
            </div> -->
            <div class="btn-search-container">
              <button class="btn-search">
                <font-awesome-icon
                  :icon="['fas', 'search']"
                  class="search-icon"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- <template v-if="loggedinUser">
        <p>Hello {{ loggedinUser.fullname }}</p>
        <button @click="logout">Logout</button>
      </template> -->
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
                <img v-if="loggedinUser" :src="loggedinUser.imgUrl" alt="" />
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
    <!-- <div class="main-title" v-if="isHome">
      <div class="text-title">
        <h2>Host a meal</h2>
        <h2>Enjoy and get paid</h2>
      </div> -->
    <!-- </div> -->
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
      location: {
        name: "",
      },
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
      this.filterBy.loc.name = this.location.name;
      console.log(this.filterBy);
      this.$store.commit({ type: "setFilter", filter: this.filterBy });
      this.$router.push(`/meal-app`);
      this.location.name=''
      
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
