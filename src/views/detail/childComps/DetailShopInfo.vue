<template>
    <div v-if="Object.keys(shop).length !==0" class="shop-info">
      <div class="shop-top">
        <img :src="shop.logo" alt="">
        <span class="title">{{shop.name}}</span>
      </div>

      <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
          <!--店家商品销量-->
          <div class="info-sells">
            <div class="sells-count">
              {{shop.sells | sellCountFilter}}
            </div>
            <div class="sells-text">总销量</div>
          </div>
          <!--店家全部商品种类-->
          <div class="info-goods">
            <div class="goods-count">{{shop.goodsCount}}</div>
            <div class="goods-text">全部宝贝</div>
          </div>
        </div>

        <div class="shop-middle-item shop-middle-right">
          <table>
            <tr v-for="(item, index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
      </div>
    </div>

</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) {
        return value
      } else {
        return (value / 10000).toFixed(2) + '万'
      }
    }
  }
}
</script>

<style scoped>
.shop-info {
  /*border: 1px solid red;*/
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8
}
.shop-top {
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
}
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.1);
}
.shop-top .title {
  /*border: 1px solid red;*/
  margin-left: 10px;
  vertical-align: center;
}

.shop-middle {
  /*border: 1px solid red;*/
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.shop-middle-item {
  flex: 1;
}

.shop-middle-left {
  display: flex;
  justify-content:space-evenly;
  color: #333;
  text-align: center;
  /*!*border: 1px solid red;*!*/
  border-right: 1px solid rgba(0,0,0,.1);
}
.sells-count, .goods-count {
  font-size: 18px;
}
.sells-text, .goods-text {
  margin-top: 12px;
  font-size: 12px;
}
.shop-middle-right {
  /*border: 1px solid red;*/
  font-size: 13px;
  color: #333;
}

.shop-middle-right table {
  margin-left: 30px;
}

.shop-middle-right table td {
  /*border: 1px solid red;*/
  padding: 5px 2px;
}

.shop-middle-right .score {
  color: #5ea732;
}

.shop-middle-right .score-better {
  color: #f13e3a;
}

.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.shop-middle-right .better-more span {
  background-color: #f13e3a;
}

.shop-bottom {
  text-align: center;
  /*border: 1px solid red;*/
  margin-top: 10px;
}

.enter-shop {
  background-color: #f2f5f8;
  border-radius: 10px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  display: inline-block;
}
</style>
