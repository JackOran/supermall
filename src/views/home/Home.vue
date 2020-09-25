<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <HomeSwiper :banner="banner"></HomeSwiper>
    <RecommendView :recommend="recommend"></RecommendView>
    <FeatureView></FeatureView>
    <TabControl class="tab-control"
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"
    ></TabControl>
    <GoodsList :goods="showdata"></GoodsList>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";

import {getHomeMultidata, getHomeData} from "network/home";


export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, goodslist: []},
        'new': {page: 0, goodslist: []},
        'sell': {page: 0, goodslist: []}
      },
      currentType: 'pop',
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
  },
  created() {
    //请求多个数据
    // console.log(this)
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  computed: {
    showdata() {
      return this.goods[this.currentType].goodslist
    }
  },
  methods: {
    /*
    * 事件监听相关的内容
    * */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    /*
    * 网络请求相关的内容
    * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banner = res.data.data.banner.list
        this.recommend = res.data.data.recommend.list
      })
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1
      getHomeData(type, page).then(res => {
        console.log(res);
        this.goods[type].goodslist.push(...res.data.data.list)
        this.goods[type].page += 1
      })
    },
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-bar {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color:#fff;
}
</style>
