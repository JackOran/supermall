<template>
  <Swiper>
    <SwiperItem v-for="item in banner" :key="item.id" >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import SwiperItem from "../../../components/common/swiper/SwiperItem";
import Swiper from "../../../components/common/swiper/Swiper";

export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: true
    }
  },
  methods: {
    imageLoad() {
      // console.log('轮播图加载完成');
      if (this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = false
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>
