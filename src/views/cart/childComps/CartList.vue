<template>
  <div class="cart-list">
    <CartListItem v-for="(item, index) in cartList"
                  :key="index" :product="item"></CartListItem>
  </div>
</template>

<script>

import CartListItem from "@/views/cart/childComps/CartListItem";
import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
}
</script>

<style scoped>

</style>
