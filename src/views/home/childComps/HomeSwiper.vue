<template>
  <Swiper>
    <SwiperItem v-for="item in banner" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="">
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
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>
