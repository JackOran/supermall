<template>
  <div class="icon-selector" :class="{check: isChecked}" @click="btnClick">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    btnClick() {
      // console.log('点击按钮选中和不选中');
      this.$emit('checkBtnClick')
    }
  }
}
</script>

<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.check {
  border-color: red;
  background-color: red;
}

</style>
