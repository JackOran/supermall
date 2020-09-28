<template>
  <div id="detail">
    <DetailNavBar class="detail-nav"></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :top-image="topImage"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :goods-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info="paramInfo"></DetailParamInfo>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import {getDetailData, Goods, Shop, GoodsParam} from "../../network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImage:[],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{}
    }
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
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
    })
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
  height: calc(100% - 44px);
}
</style>
