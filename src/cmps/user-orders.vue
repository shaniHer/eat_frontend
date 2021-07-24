<template>
  <section class="main-layout user-orders">
    <article v-if="orders">
      <table>
        <tr>
          <th><!-- img --></th>
          <th>Name</th>
          <th>Phone</th>
          <th>Meal</th>
          <th>Email</th>

          <th>Chat</th>
        </tr>
        <tr v-for="user in ordersToShow" :key="user._id">
          <td>
            <!-- <img src="require(user.buyer.imgUrl)" /> -->
            <img
              class="avatar"
              :src="require('@/assets/img/usersImg/user4.jpg')"
            />
          </td>
          <td>{{ user.buyer.fullname }}</td>
          <td>{{ phoneNum }}</td>
          <td>{{ user.meal.title }}</td>
          <td>{{ randomEmail }}</td>
          <td><button class="msg">Msg</button></td>
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
  computed: {
    ordersToShow() {
      console.log(this.orders);
      return this.orders.filter(
        (order) => order.host._id === this.logdinUser._id
      );
    },

    phoneNum() {
      return util.reandomPhoneNum();
    },

    randomEmail(){
      return util.randomEmail()
    }
  },
  //   ---------------------------------
};
</script>

