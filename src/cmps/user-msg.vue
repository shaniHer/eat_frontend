<template>
  <div v-if="msg" :class="'user-msg'">
    <h3 :class="msgClass">
      {{ msg.txt }}
    </h3>
  </div>
</template>

<script>
export default {
  computed: {
    msgClass() {
      if (!this.msg) return;
      return `${this.msg.type}`;
    },
    msg() {
      return this.$store.getters.userMsg;
    },
  },
};
</script>
