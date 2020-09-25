<template>
<div class="recommend">
  <div v-for="item in recommend" :key="item.id" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
}
.recommend-item {
  flex: 1;
  /*border: 1px solid red;*/
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
