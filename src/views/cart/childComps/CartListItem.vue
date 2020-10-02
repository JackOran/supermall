<template>
  <div id="cart-list-item">

    <div class="item-selector">
      <CheckButton :is-checked="product.checked" @checkBtnClick="checkBtnClick"></CheckButton>
    </div>

    <div class="item-img">
      <img :src="product.img" alt="商品照片">
    </div>

    <div class="item-info">

      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{product.lowNowPrice}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/views/cart/childComps/CheckButton";

import {mapGetters} from 'vuex'
export default {
  name: "CartListItem",
  props: {
    product: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton,
  },
  methods: {
    checkBtnClick() {
      this.product.checked = !this.product.checked
    }
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
}
</script>

<style scoped>
#cart-list-item {
  display: flex;
  width: 100%;
  /*font-size: 0;*/
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 15px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

</style>
