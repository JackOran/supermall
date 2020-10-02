<template>
  <div id="cart">
<!--    顶部导航-->
    <NavBar class="cart-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
<!--    商品列表-->
    <Scroll class="content" ref="scroll">
      <CartList></CartList>
    </Scroll>
<!--    底部汇总-->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import Scroll from "@/components/common/scroll/Scroll";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  methods: {
    backClick() {
      this.$router.back()
    }
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    ...mapGetters(["cartLength"])
  },
  activated() {
    console.log('----------');
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>

#cart {
  position: relative;
  height: 100vh;
}
.cart-bar {
  position: relative;
  z-index: 9;
  font-weight: 600;
  color: #fff;
  background-color: var(--color-tint);
}
.content {
  /*position: absolute;*/
  /*overflow: hidden;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 44px;*/
  /*bottom: 49px;*/
  height: calc(100% - 44px - 49px - 40px);
}

.back img {
  margin-top: 12px;
}
</style>
