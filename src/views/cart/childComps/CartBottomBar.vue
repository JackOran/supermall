<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <CheckButton class="select-all"
                   :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="calcClick">去计算({{ $store.getters.cartCount }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import {mapGetters} from 'vuex'
import { Toast } from 'vant';

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
    [Toast.name]: Toast
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue += item.lowNowPrice * item.count
      }, 0)
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return !(this.$store.state.cartList.filter(item => !item.checked).length)
    }
  },
  methods: {
    checkClick() {
      // console.log('--------');
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (this.cartList.length === 0) {
        Toast('请选择对应的商品')
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  height: 44px;
  background-color: #eee;
  position: relative;
  line-height: 44px;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.cart-bottom-bar .select-all {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  line-height: 18px;
}

.total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  position: absolute;
  right: 0;
}


</style>
