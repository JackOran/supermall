<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                class="tab-control"
                v-show="isAttached"
    ></TabControl>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banner="banner" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommend="recommend"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"
      ></TabControl>
      <GoodsList :goods="showdata"></GoodsList>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

import {getHomeMultidata, getHomeData} from "network/home";
import {itemListenerMixin} from "common/mixin";
// import {debounce} from "common/utils";

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
      scroll: null,
      isShowBackTop: false,
      taboffsetTop: 0,
      isAttached: false,
      saveY: 0,
    }
  },
  mixins: [itemListenerMixin],
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
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
  mounted() {
    // //监听item中图片加载完成
    // //加入防抖函数的写法
    // const refresh = debounce(this.$refs.scroll.refresh, 2000)
    //
    // //对监听事件进行保存
    // this.itemImageListener = () => {
    //   refresh()
    //   //无防抖函数的写法
    //   // this.$refs.scroll.refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
    console.log('我是home中的mounted');
  },
  computed: {
    showdata() {
      return this.goods[this.currentType].goodslist
    }
  },
  activated() {
    // console.log('-------');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('-----');
    //离开保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageListener)
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
      this.$refs.tabControl1.currentindex = index
      this.$refs.tabControl2.currentindex = index
    },
    backClick() {
      // console.log('回到上面');
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    contentScroll(position) {
      // console.log(position);
      //判断backTop是否显示
      if (position.y < -1000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
      //判断tabControl是否吸顶(创建两个tabControl 做到偷天换日)
      this.isAttached = (position.y) < -this.taboffsetTop
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeData(this.currentType)
    },

    swiperImageLoad() {
      // console.log('轮播图加载完成');
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        // console.log(res);
        this.goods[type].goodslist.push(...res.data.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp(2000)
      })
    },
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}

.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
</style>
