<template>
  <div class="goods">

    <GoodsListItem v-for="item in goods" :goodsitem="item" :key="item.id"></GoodsListItem>
  </div>
</template>

<script>

import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem,
  }
}
</script>

<style scoped>

.goods {
  display: flex;
  flex-wrap: wrap;
  /*padding: 2px;*/
  justify-content: space-around;
}
</style>
