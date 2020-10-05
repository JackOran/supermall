<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="detailNav"></DetailNavBar>

    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <DetailSwiper :top-image="topImage"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :goods-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommonInfo ref="comment" :commont-info="commontInfo"></DetailCommonInfo>
      <GoodsList ref="recommend" :goods="recommendInfo"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addCart="addCart"></DetailBottomBar>
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommonInfo from "./childComps/DetailCommonInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {getDetailData, getRecommendData, Goods, Shop, GoodsParam} from "network/detail";
import {backTop, itemListenerMixin} from "common/mixin";
import {debounce} from "common/utils";
import {mapActions} from 'vuex'
import { Toast } from 'vant';

export default {
  name: "Detail",
  components: {
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommonInfo,
    DetailBottomBar,
    Scroll,
    [Toast.name]: Toast,
  },
  mixins: [itemListenerMixin, backTop],
  data() {
    return {
      iid: null,
      topImage:[],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commontInfo:{},
      recommendInfo: [],
      ScrollTopY: [],
      getThemeY: null,
      currentIndex: 0,
      // message:'',
      // show: false,
    }
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {

      this.getThemeY()
    },
    titleClick(index) {
      // console.log('我是联动');
      this.$refs.scroll.scrollTo(0, -this.ScrollTopY[index], 200)
    },
    contentScroll(position) {
      // console.log(position);
      let length =  this.ScrollTopY.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length - 1 && -position.y >= this.ScrollTopY[i] && -position.y
          < this.ScrollTopY[i+1]) || (i === length - 1 && -position.y >= this.ScrollTopY[i]))) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex
          console.log(this.currentIndex);
        }
      }
      //判断backTop是否显示
      if (position.y < -1000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    },
    addCart() {
      console.log('加入购物车');
      //获取购物车需要展示的信息
      const product = {}
      product.img = this.topImage[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.lowNowPrice = this.goods.lowNowPrice
      product.iid = this.iid

      //将商品添加到购物车中
      //方法1
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res);
        //方法1.
        // this.message = res
        // this.show = true
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },2000)

        //方法2.
        // this.$toast.show(res, 2000)
        Toast(res);
      })

      //方法2
      // this.addCart(product).then(res => {
      //   console.log(res);
      // })

      // console.log(this.$store.state.cartList.length);
    },
  },
  created() {

    //保存传入的iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetailData(this.iid).then(res => {
      console.log(res);
      const data = res.data.result

      //获取顶部的图片轮播数据
      this.topImage = data.itemInfo.topImages

      //获取详情页商品信息
      this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services)

      //获取店家信息
      this.shop = new Shop(data.shopInfo)

      //获取商品图片信息
      this.detailInfo = data.detailInfo

      //获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取商品评论信息
      if (data.rate.cRate !== 0) {
        this.commontInfo = data.rate.list[0]
      }

      this.getThemeY = debounce(() =>{
        this.refresh()
        this.ScrollTopY.push(0)
        this.ScrollTopY.push(this.$refs.params.$el.offsetTop)
        this.ScrollTopY.push(this.$refs.comment.$el.offsetTop)
        this.ScrollTopY.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.ScrollTopY);
      }, 200)

      //this.nextTick()
      //值还是不对，因为图片没有加载完
      // this.$nextTick(() => {
      //   this.ScrollTopY = []
      //
      //   this.ScrollTopY.push(0)
      //   this.ScrollTopY.push(this.$refs.params.$el.offsetTop)
      //   this.ScrollTopY.push(this.$refs.comment.$el.offsetTop)
      //   this.ScrollTopY.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.ScrollTopY);
      // })
    })

    //获取详情页推荐数据
    getRecommendData().then(res => {
      console.log(res);
      this.recommendInfo = res.data.data.list
    })
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
