<template>
  <div class="user-avatar-container">
    <!-- <h2>Profile picture</h2> -->
    <img v-if="imgUrl" :src="imgUrl" alt="">
    <img v-else src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
    }
  }
}
</script>

<style>
/* .user-avatar-container img {
  object-fit: cover;
  border-radius: 50%;  
  height: em(30px);
  width: em(30px);
  box-shadow: 0px 0px 3px #ff5a002b;
} */
</style>