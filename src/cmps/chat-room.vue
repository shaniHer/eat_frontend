<template>
  <div class="container">
    <!-- <h1>About Us</h1>
    <p>We like You</p>
    <h2>Lets Chat About {{topic}}</h2>
    <label>
      <input type="radio" value="Politics" v-model="topic" @change="changeTopic" /> 
      Politics
    </label>
    <label>
      <input type="radio" value="Love" v-model="topic" @change="changeTopic" /> 
      Love
    </label> -->
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <hr />

    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";

export default {
  props: { loggdinUser: { type: Object } },
  data() {
    return {
      msg: { from: this.loggdinUser.username, txt: "" },
      msgs: [],
      userIsTyping: null,
      topic: "Love",
    };
  },

  computed: {
    userName() {
      // this.msg.from = this.$store.getters.loggedinUser.fullname;
      // console.log( this.msg.from);
    },
  },
  created() {

    // socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);

    //  this.msg.from = this.$store.getters.loggedinUser.fullname;
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    // socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg);
      console.log(this.msgs);
    },
    sendMsg() {
      console.log("Sending", this.msg);
      socketService.emit("chat newMsg", this.msg);
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      this.msg = { from: this.msg.from, txt: "" };
    },
    changeTopic() {
      socketService.emit("chat topic", this.topic);
    },
  },
};
</script>
