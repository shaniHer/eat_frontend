
<template>
  <div id="app" class="app-main" :class="`${topClass}`">
    <user-msg />
    <app-header />
     <!-- <chat-room class="chat" :loggdinUser="loggdinUser"></chat-room> -->
    <router-view />

    <app-footer />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
import userMsg from "@/cmps/user-msg";
// import chatRoom from '../src/cmps/chat-room.vue'

export default {
  data() {
    return {
      topClass: "",
      loggdinUser: null,
      chatIsOpen: false,
    };
  },
  // -----------------------------------@@@@@@@@@@@@@
  created() {
    window.onscroll = () => {
      if (window.scrollY !== 0) this.topClass = "top";
      else this.topClass = "";
    };
    this.loggdinUser = this.$store.getters.loggedinUser;
  },
  // -----------------------------------@@@@@@@@@@

  methods: {},
  components: {
    appHeader,
    appFooter,
    userMsg,
    // chatRoom
  },
};
</script>


