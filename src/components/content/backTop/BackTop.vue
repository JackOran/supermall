<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="向上小按钮">
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 2px;
  bottom: 51px;
  z-index: 9;
}
.back-top img {
  width: 48px;
  height: 48px;
}
</style>
