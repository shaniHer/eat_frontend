<template>
  <section>
    <article v-if="orders">
      <table class="user-orders">
        <tr>
          <th>img</th>
          <th>Fullname</th>
          <th>Phone number</th>
          <th>id</th>
        </tr>
        <tr v-for="user in ordersToShow" :key="user._id">
          <td>
            <img src="require(user.buyer.imgUrl)" />
          </td>
          <td>{{ user.buyer.fullname }}</td>
          <td>{{ phoneNum }}</td>
          <td>{{ user.buyer._id }}</td>
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
      return this.orders.filter(
        (order) => order.host._id === this.logdinUser._id
      );
    },

    phoneNum() {
      return util.reandomPhoneNum();
    },
  },
  //   ---------------------------------
};
</script>

