<template>
  <div class="bottom-bar">

    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  background-color: #fff;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}

.bar-item {
  display: flex;
  flex: 1;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 12px;
  /*border: 1px solid red;*/
  position: relative;
  bottom: 5px;
}

.bar-left .icon {
  width: 22px;
  height: 22px;
  display: block;
  margin: 10px auto 3px;
  /*border: 1px solid red;*/
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0px -53px;
}

.bar-left .shop {
  background-position: 0px -98px;
}

.bar-right {
  line-height: 49px;
  color: #fff;
  font-size: 15px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}

</style>
