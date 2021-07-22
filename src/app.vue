
<template>
  <div id="app" class="app-main"  :class="`${topClass}`" >
    <user-msg />
    <app-header/>
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
import userMsg from "@/cmps/user-msg";
export default {
  data() {
    return {
      userLogged: false,
      topClass: "top",
    };
  },
  // -----------------------------------@@@@@@@@@@@@@
  created() {
    window.onscroll = () => {
      if (window.scrollY !== 0) this.topClass = "";
      else this.topClass = "top";
    };
  },
  // -----------------------------------@@@@@@@@@@
  components: {
    appHeader,
    appFooter,
    userMsg,
  },
};
</script>


