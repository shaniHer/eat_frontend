<template>
  <section class="main-layout user-orders">
    <article v-if="orders">

      <!-- --------------------------------------- -->
        <!-- <chat-room class="chat" :loggdinUser="logdinUser"></chat-room> -->
      <!-- --------------------------------------- -->

      <table>
        <tr>
          <th><!-- img --></th>
          <th>Name</th>
          <th>Guest</th>
          <th>Phone</th>
          <th>Meal</th>
          <th>Email</th>

          <th>Chat</th>
        </tr>
        <tr v-for="user in ordersToShow" :key="user._id">
          <td>
            <img class="avatar" :src="require(`@/${user.buyer.imgUrl}.jpg`)" />
          </td>
          <td>{{ user.buyer.fullname }}</td>
          <td>{{ user.guestsNum }}</td>
          <td>
            <font-awesome-icon
              class="user-orders-icon"
              :icon="['fa', 'phone-square']"
            />
          </td>
          <td>{{ user.meal.title }}</td>
          <td>
            <font-awesome-icon
              class="user-orders-icon"
              :icon="['fas', 'envelope']"
            />
          </td>

          <td><button @click="openChat" class="msg">Msg</button></td>
        </tr>
      </table>
    </article>
  </section>
</template>

<script>
import { util } from "../services/util.js";
import chatRoom from "../cmps/chat-room.vue";

export default {
  props: { orders: { type: Array }, logdinUser: { type: Object } },

  //   ---------------------------------
  data() {
    return {
      chatIsOpen: false,
    };
  },
  //   ---------------------------------
  methods: {
    openChat() {
      this.chatIsOpen = !this.chatIsOpen;
    },
  },
  //   ---------------------------------
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
  components: {
    chatRoom,
  },
};
</script>

