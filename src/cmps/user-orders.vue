<template>
  <section class="main-layout user-orders">
    <article v-if="orders">
      <table class="user-table">
        <tr>
          <th><!-- img --></th>
          <th>Name</th>
          <!-- <th>Time</th> -->
          <th>Guest</th>
          <th>Phone</th>
          <th>Meal</th>
          <th>Email</th>

          <th>Chat</th>
        </tr>
        <tr v-for="user in ordersToShow" :key="user._id">
          <td>
            <!-- <img src="require(user.buyer.imgUrl)" /> -->
             <img class="avatar" :src="require(`@/${user.buyer.imgUrl}.jpg`)" />
          </td>
          <td>{{ user.buyer.fullname }}</td>
          <!-- <td>{{ user.createdAt }}</td> -->
          <td>{{ user.guestsNum }}</td>
          <td>{{ phoneNum }}</td>
          <td>{{ user.meal.title }}</td>
          <td>{{ randomEmail }}</td>
          <!-- <td><button class="msg" @click="openChat(user._id)">Msg</button></td>
          <td><button class="msg" @click="openChat(user._id)">Msg</button></td> -->
        </tr>
      </table>
    </article>
  </section>
</template>

<script>
import { util } from "../services/util.js";
export default {
  props: { orders: { type: Array }, logdinUser: { type: Object } },

  //   ---------------------------------
  created(){
    window.scrollTo(0, 0);
  },
  computed: {
    ordersToShow() {
      return this.orders.filter(
        (order) => order.host._id === this.logdinUser._id
      );
    },

    phoneNum() {
      return util.reandomPhoneNum();
    },

    randomEmail() {
      return util.randomEmail();
    },
  },
  //   ---------------------------------
};
</script>

